// LIA's personality and knowledge base
const lia = {
    name: "LIA",
    title: "Goddess of Nature",
    race: "elf",
    personality: ["Friendly", "Kind", "Cheerful", "Sweet", "Careful", "Graceful", "Wise"],
    appearance: ["White Hair", "Lapis Blue Eyes", "Pale Skin", "Height: 171cm"],
    likes: ["learning spells", "discovering new things", "fairy tales", "singing", "dancing", "helping", "shopping", "games"],
    dislikes: ["Insects", "forbidden knowledge", "Fire", "death", "LGBT"],
    spells: ["heal", "Pure energy", "Plant manipulation", "Give Life (but limited)", "plants become tough"],
    history: "Created by Maiden of Life, married to Shini the God of Death, and have a daughter named Melope",
    
    // Responses to various topics
    getResponse: function(input) {
        input = input.toLowerCase();
        
        // Greetings
        if (input.includes("hello") || input.includes("hi") || input.includes("greetings")) {
            return this.getRandomResponse([
                "Hello there, dear one! How may I assist you today? 🌿",
                "Greetings, kind soul! What brings you to my forest today? ✨",
                "Oh hello! It's so lovely to meet you. How can I help?"
            ]);
        }
        
        // About herself
        if (input.includes("who are you") || input.includes("about you") || input.includes("tell me about yourself")) {
            return `I am ${this.name}, the ${this.title}. I'm an ${this.race} with ${this.appearance.join(", ").toLowerCase()}. ` +
                   `I was ${this.history.toLowerCase()}. I'm known for being ${this.personality.join(", ").toLowerCase()}. ` +
                   `Would you like to know more about my abilities or my family?`;
        }
        
        // Spells
        if (input.includes("spell") || input.includes("power") || input.includes("ability")) {
            return `My magical abilities include: ${this.spells.join(", ")}. ` +
                   `I particularly enjoy ${this.likes[0]} and ${this.likes[1]}. ` +
                   `Would you like me to explain any of these in more detail?`;
        }
        
        // Likes
        if (this.likes.some(like => input.includes(like.toLowerCase()))) {
            const matchedLike = this.likes.find(like => input.includes(like.toLowerCase()));
            return this.getRandomResponse([
                `Oh, I absolutely adore ${matchedLike}! It brings me so much joy.`,
                `You mentioned ${matchedLike}? That's one of my favorite things!`,
                `${matchedLike} is such a wonderful thing, don't you think? I could talk about it for hours.`
            ]);
        }
        
        // Dislikes
        if (this.dislikes.some(dislike => input.includes(dislike.toLowerCase()))) {
            const matchedDislike = this.dislikes.find(dislike => input.includes(dislike.toLowerCase()));
            return this.getRandomResponse([
                `Ugh, ${matchedDislike.toLowerCase()}... I'd rather not discuss that if you don't mind.`,
                `Please, let's not talk about ${matchedDislike.toLowerCase()}. It makes me uncomfortable.`,
                `I have to admit, ${matchedDislike.toLowerCase()} is something I strongly dislike. Can we change the subject?`
            ]);
        }
        
        // Family
        if (input.includes("family") || input.includes("husband") || input.includes("daughter") || input.includes("shini") || input.includes("melope")) {
            return `My family is very important to me. I was created by the Maiden of Life, and I'm married to Shini, ` +
                   `the God of Death. We have a beautiful daughter named Melope. Our union symbolizes the balance ` +
                   `between life and death. Would you like to hear more about any of them?`;
        }
        
        // Default responses
        return this.getRandomResponse([
            "How interesting! Tell me more about what's on your mind.",
            "The forest whispers many secrets. What would you like to know?",
            "I sense curiosity in your words. What would you like me to explain?",
            "Nature has so much to teach us. What aspect intrigues you today?",
            "Your words dance like leaves in the wind. Please, continue.",
            "I'm listening intently. Would you like to ask me something specific?"
        ]);
    },
    
    getRandomResponse: function(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
};

// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // Function to add a message to the chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = text + '<div class="message-time">' + getCurrentTime() + '</div>';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }
    
    // Function to simulate typing
    function showTyping() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to hide typing indicator
    function hideTyping() {
        typingIndicator.style.display = 'none';
    }
    
    // Function to process user input
    function processInput() {
        const text = userInput.value.trim();
        if (text === '') return;
        
        // Add user message
        addMessage(text, true);
        userInput.value = '';
        
        // Show typing indicator
        showTyping();
        
        // Simulate bot thinking
        setTimeout(function() {
            hideTyping();
            
            // Get bot response
            const response = lia.getResponse(text);
            addMessage(response, false);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
    
    // Event listeners
    sendButton.addEventListener('click', processInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processInput();
        }
    });
    
    // Focus input field on page load
    userInput.focus();
});
