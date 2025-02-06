document.addEventListener('DOMContentLoaded', () => {
    // ... existing setup ...

    // Modified initial greeting
    if (!loadChatHistory()) {
        addBotMessage(`🌠 Welcome to the Enchanted Glade! I'm Lia, your forest elf companion. 
            Ask about woodland creatures, ancient trees, or nature's hidden magic!`);
    }

    // Updated quick topics
    function createInteractiveButtons() {
        const quickTopics = document.createElement('div');
        quickTopics.className = 'quick-topics';
        quickTopics.innerHTML = `
            <button data-topic="forest">🌳 Forest Secrets</button>
            <button data-topic="creatures">🦌 Woodland Friends</button>
            <button data-topic="magic">🔮 Nature Magic</button>
        `;
        // ... rest of function ...
    }

    // Modified message handler
    async function handleUserMessage() {
        // ... existing code ...
        setTimeout(() => {
            try {
                const botResponse = getLiaResponse(message);
                typingIndicator.remove();
                addBotMessage(botResponse);
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.remove();
                addBotMessage("🍃 *Lia's glow dims* The forest whispers are faint... Try again?");
            }
        }, 1500);
    }
});
