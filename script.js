document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    async function handleUserInput() {
        // ... existing code ...

        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message, 
                localStorage.getItem('natureChatName') || 'organic being');
            chatMessages.appendChild(createMessageElement(response, false));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }

    // Initialize LIA's personality
    if(!localStorage.getItem('liaTraits')) {
        localStorage.setItem('liaFocus', 'biome consciousness');
    }
});
