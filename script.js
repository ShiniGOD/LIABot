const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
sendBtn.addEventListener('click', sendMessage);

function appendMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Disable input during processing
    userInput.disabled = true;
    sendBtn.disabled = true;

    appendMessage(message, true);

    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-message loading-dots';
    loadingDiv.textContent = 'Thinking about nature';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await getBotResponse(message);
        loadingDiv.remove();
        appendMessage(response, false);
    } catch (error) {
        loadingDiv.remove();
        appendMessage("Sorry, I'm having trouble connecting to nature 🌧️", false);
        console.error('Error:', error);
    }

    // Reset input
    userInput.value = '';
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
}

async function getBotResponse(userMessage) {
    const API_KEY = 'ds-sk-your-api-key-here'; // 🔑 Replace with your DeepSeek key
    const API_URL = 'https://api.deepseek.com/v1/chat/completions';

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "You are a friendly nature expert. Provide concise answers about plants, animals, and ecosystems using emojis. Keep responses under 2 sentences."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.message}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
