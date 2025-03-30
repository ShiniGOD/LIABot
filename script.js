document.addEventListener('DOMContentLoaded', () => {
    // Hugging Face Configuration
    const HF_API_KEY = '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'; // Get from https://huggingface.co/settings/tokens
    const MODEL_NAME = 'facebook/blenderbot-400M-distill';
    
    // DOM Elements
    const elements = {
        setPersonalityBtn: document.getElementById('set-personality-btn'),
        sendBtn: document.getElementById('send-btn'),
        userInput: document.getElementById('user-input'),
        personalityInput: document.getElementById('personality'),
        chatHistory: document.getElementById('chat-history')
    };

    // State
    let currentPersonality = "You are a helpful assistant.";

    // Verify elements
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Missing element: ${name}`);
            return;
        }
    }

    // Event Listeners
    elements.setPersonalityBtn.addEventListener('click', savePersonality);
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function savePersonality() {
        currentPersonality = elements.personalityInput.value || currentPersonality;
        addMessage("Personality updated!", 'bot');
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        elements.chatHistory.appendChild(messageDiv);
        elements.chatHistory.scrollTop = elements.chatHistory.scrollHeight;
    }

    async function getAIResponse(userMessage) {
        try {
            const response = await fetch(
                `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${HF_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: {
                            "past_user_inputs": [currentPersonality],
                            "generated_responses": [],
                            "text": userMessage
                        }
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'API request failed');
            }

            const data = await response.json();
            return data.generated_text;
        } catch (error) {
            console.error('API Error:', error);
            return `Error: ${error.message}`;
        }
    }

    async function sendMessage() {
        const text = elements.userInput.value.trim();
        if (!text) return;

        elements.userInput.value = '';
        elements.userInput.disabled = true;
        elements.sendBtn.disabled = true;
        elements.sendBtn.textContent = 'Sending...';

        try {
            addMessage(text, 'user');
            const response = await getAIResponse(text);
            addMessage(response, 'bot');
        } catch (error) {
            addMessage(`Error: ${error.message}`, 'bot');
        } finally {
            elements.userInput.disabled = false;
            elements.sendBtn.disabled = false;
            elements.sendBtn.textContent = 'Send';
        }
    }
});
