document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Load chat history or show initial greeting
    loadChatHistory() || addBotMessage("🌿 Welcome to Nature Chat! Ask about nature!");

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

    // Local Storage Functions
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

    // Interactive Quick Topics
    function createInteractiveButtons() {
        const quickTopics = document.createElement('div');
        quickTopics.className = 'quick-topics';
        quickTopics.innerHTML = `
            <button data-topic="flora">🌿 Plant Facts</button>
            <button data-topic="fauna">🦉 Animal Facts</button>
            <button data-topic="weather">⛅ Weather Facts</button>
        `;
        chatMessages.parentNode.insertBefore(quickTopics, chatMessages.nextSibling);

        document.querySelectorAll('.quick-topics button').forEach(button => {
            button.addEventListener('click', () => {
                const topic = button.dataset.topic;
                handleTopicSelection(topic);
            });
        });
    }

    function handleTopicSelection(topic) {
        const sampleQuestions = {
            flora: ['Tell me about trees', 'How do plants grow?', 'Flower facts'],
            fauna: ['Animal habitats', 'Bird migration', 'Insect species'],
            weather: ['Climate change', 'Rain patterns', 'Weather prediction']
        };
        userInput.value = sampleQuestions[topic][Math.floor(Math.random() * 3)];
        handleUserMessage();
    }

    async function handleUserMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        userInput.value = '';
        userInput.focus();

        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            const botResponse = getBotResponse(message);
            typingIndicator.remove();
            addBotMessage(botResponse);
        }, 1500);
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Initial Setup
    createInteractiveButtons();
    scrollToBottom();
});
