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

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, true);
    
    setTimeout(() => {
        const response = getBotResponse(message);
        appendMessage(response, false);
    }, 800);

    userInput.value = '';
    userInput.focus();
}
