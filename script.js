document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Load chat history or show initial greeting
    if (!loadChatHistory()) {
        addBotMessage("🌿 Welcome to Nature Chat! Ask about plants, animals, or weather!");
    }

    // Message handling functions
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        saveChatHistory();
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        saveChatHistory();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = '<div class="loading-dots"></div>';
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    }

    // Chat history management
    function saveChatHistory() {
        const messages = Array.from(chatMessages.children)
            .filter(el => el.classList.contains('message'))
            .map(el => ({
                text: el.innerHTML,
                type: el.classList.contains('user-message') ? 'user' : 'bot'
            }));
        localStorage.setItem('natureChatHistory', JSON.stringify(messages));
    }

    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('natureChatHistory'));
        if (history) {
            history.forEach(msg => {
                const div = document.createElement('div');
                div.className = `message ${msg.type}-message`;
                div.innerHTML = msg.text;
                chatMessages.appendChild(div);
            });
            return true;
        }
        return false;
    }

    // Enhanced message handler
    async function handleUserMessage() {
        const message = userInput.value.trim();
        
        if (!message) {
            userInput.placeholder = "Please type a message...";
            userInput.classList.add('shake');
            setTimeout(() => userInput.classList.remove('shake'), 500);
            return;
        }

        addUserMessage(message);
        userInput.value = '';
        userInput.focus();

        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            try {
                const botResponse = getBotResponse(message);
                typingIndicator.remove();
                addBotMessage(botResponse);
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.remove();
                addBotMessage("🌧️ Oops! My nature connection is fuzzy right now...");
            }
        }, 1500);
    }

    // Event listeners with delegation
    document.addEventListener('click', (e) => {
        if (e.target.matches('#send-btn, #send-btn *')) {
            handleUserMessage();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement === userInput) {
            handleUserMessage();
        }
    });

    // Quick topics buttons
    function createInteractiveButtons() {
        const quickTopics = document.createElement('div');
        quickTopics.className = 'quick-topics';
        quickTopics.innerHTML = `
            <button data-topic="flora">🌿 Plant Facts</button>
            <button data-topic="fauna">🦉 Animal Facts</button>
            <button data-topic="weather">⛅ Weather Facts</button>
        `;
        chatMessages.parentNode.insertBefore(quickTopics, chatMessages.nextSibling);

        quickTopics.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const topic = e.target.dataset.topic;
                const questions = {
                    flora: ['Tell me about trees', 'How do plants grow?', 'Flower facts'],
                    fauna: ['Animal habitats', 'Bird migration', 'Insect species'],
                    weather: ['Climate change', 'Rain patterns', 'Weather prediction']
                };
                userInput.value = questions[topic][Math.floor(Math.random() * 3)];
                handleUserMessage();
            }
        });
    }

    // Initial setup
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    createInteractiveButtons();
    scrollToBottom();
});
