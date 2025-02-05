document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Add initial bot greeting
    addBotMessage("🌿 Welcome to Nature Chat! Ask me about plants, animals, weather, or anything nature-related!");

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = '<div class="loading-dots"></div>';
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleUserMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message and clear input
        addUserMessage(message);
        userInput.value = '';
        userInput.focus();

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Simulate AI processing delay
        setTimeout(() => {
            // Get and display bot response
            const botResponse = getBotResponse(message);
            typingIndicator.remove();
            addBotMessage(botResponse);
        }, 1500);
    }

    // Event listeners
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Initial scroll to bottom
    scrollToBottom();
});
