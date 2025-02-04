const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

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

    // Disable input while processing
    userInput.disabled = true;
    sendBtn.disabled = true;

    appendMessage(message, true);
    
    // Show loading indicator
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
        appendMessage("Sorry, I'm having trouble connecting to nature right now 🌧️", false);
        console.error('Chat Error:', error);
    }

    // Re-enable input
    userInput.value = '';
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
}

async function getBotResponse(userMessage) {
    const API_KEY = 'sk-abcdef1234567890abcdef1234567890abcdef12'; // 🔑 REPLACE WITH YOUR OPENAI API KEY
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a friendly nature expert. Provide concise, engaging answers about plants, animals, ecosystems, and environmental conservation. Use emojis and simple language suitable for all ages."
            }, {
                role: "user",
                content: userMessage
            }],
            max_tokens: 150,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
