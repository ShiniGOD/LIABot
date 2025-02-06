// Add after existing code
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

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    createInteractiveButtons();
});
