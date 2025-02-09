document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    let isBotTyping = false;

    function createMessageElement(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.textContent = text;
        
        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        if(isUser) {
            const status = document.createElement('div');
            status.className = 'message-status';
            status.innerHTML = '<i class="fas fa-check"></i>';
            messageDiv.append(contentDiv, timestamp, status);
        } else {
            messageDiv.append(contentDiv, timestamp);
        }

        return messageDiv;
    }

    function showTypingIndicator() {
        if(isBotTyping) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot" style="animation-delay: 0.2s"></div>
            <div class="typing-dot" style="animation-delay: 0.4s"></div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        isBotTyping = true;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if(typingIndicator) {
            typingIndicator.remove();
            isBotTyping = false;
        }
    }

    async function handleUserInput() {
        const message = userInput.value.trim();
        if(!message) return;

        // Add user message
        chatMessages.appendChild(createMessageElement(message, true));
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate API call delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message);
            chatMessages.appendChild(createMessageElement(response, false));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }

    // Quick action button handler
    document.querySelector('.quick-action-btn').addEventListener('click', (e) => {
        const message = e.currentTarget.dataset.message;
        userInput.value = message;
        handleUserInput();
    });

    // Event listeners
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleUserInput();
    });

    // Initial greeting
    setTimeout(() => {
        chatMessages.appendChild(createMessageElement(getBotResponse('hello'), false));
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
});
