let currentPersonality = "You are a helpful assistant.";
const DEEPSEEK_API_KEY = 'your-api-key-here'; 
const API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';

document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    document.getElementById('set-personality').addEventListener('click', savePersonality);
    document.getElementById('send-button').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

function savePersonality() {
    currentPersonality = document.getElementById('personality').value || "You are a helpful assistant.";
    addMessage("Personality updated!", 'bot');
}

function addMessage(text, sender) {
    const chatHistory = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
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

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('API Error:', error);
        return `Error: ${error.message}`;
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const text = userInput.value.trim();
    
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';
    
    // Disable UI during request
    const sendButton = document.getElementById('send-button');
    userInput.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    try {
        const response = await getAIResponse(text);
        addMessage(response, 'bot');
    } catch (error) {
        addMessage(`Error: ${error.message}`, 'bot');
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        sendButton.textContent = 'Send';
    }
}
