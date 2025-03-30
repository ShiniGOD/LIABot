document.addEventListener('DOMContentLoaded', () => {
    // Hugging Face Configuration
    const HF_API_KEY = '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';
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
    let conversationHistory = [];

    // Event Listeners
    elements.setPersonalityBtn.addEventListener('click', savePersonality);
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

    function savePersonality() {
        currentPersonality = elements.personalityInput.value || currentPersonality;
        conversationHistory = []; // Reset conversation with new personality
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
            // Format input for BlenderBot
            const prompt = {
                inputs: {
                    "text": `${currentPersonality} ${userMessage}`,
                    "past_user_inputs": conversationHistory.filter(m => m.role === 'user').map(m => m.content),
                    "generated_responses": conversationHistory.filter(m => m.role === 'bot').map(m => m.content)
                }
            };

            const response = await fetch(
                `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${HF_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(prompt)
                }
            );

            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            
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
        toggleUI(true);

        try {
            addMessage(text, 'user');
            conversationHistory.push({ role: 'user', content: text });
            
            const response = await getAIResponse(text);
            addMessage(response, 'bot');
            conversationHistory.push({ role: 'bot', content: response });

        } catch (error) {
            addMessage(`Error: ${error.message}`, 'bot');
        } finally {
            toggleUI(false);
        }
    }

    function toggleUI(disabled) {
        elements.userInput.disabled = disabled;
        elements.sendBtn.disabled = disabled;
        elements.sendBtn.textContent = disabled ? 'Sending...' : 'Send';
    }
});
