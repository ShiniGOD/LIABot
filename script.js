document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        setPersonalityBtn: document.getElementById('set-personality-btn'),
        sendBtn: document.getElementById('send-btn'),
        userInput: document.getElementById('user-input'),
        personalityInput: document.getElementById('personality'),
        chatHistory: document.getElementById('chat-history')
    };

    // Verify all elements exist
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

    // State
    let currentPersonality = "You are a helpful assistant.";
    const DEEPSEEK_API_KEY = 'sk-de004f50b31a4807ba1743aa116824fd';
    const API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';

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
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        { role: "system", content: currentPersonality },
                        { role: "user", content: userMessage }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('API Error:', error);
            return `Error: ${error.message}`;
        }
    }

    async function sendMessage() {
        const text = elements.userInput.value.trim();
        if (!text) return;

        // Clear input
        elements.userInput.value = '';
        
        // Disable UI
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
            // Re-enable UI
            elements.userInput.disabled = false;
            elements.sendBtn.disabled = false;
            elements.sendBtn.textContent = 'Send';
        }
    }
});
