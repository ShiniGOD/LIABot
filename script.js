// script.js
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserInput() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        userInput.value = '';

        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot-message loading-dots';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate bot response delay
        setTimeout(() => {
            chatMessages.removeChild(loadingDiv);
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 800);
    }

    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });

    // Initial bot greeting
    addMessage(getBotResponse('hello'), false);
});
