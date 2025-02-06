const natureKnowledgeBase = {
    flora: {
        patterns: ['plant', 'tree', 'flower', 'leaf', 'photosynthesis'],
        responses: [
            '🌱 Did you know a sunflower tracks the sun? This is called heliotropism!',
            '🌳 The Amazon Rainforest produces 20% of the world\'s oxygen',
            '🍄 Fungi have their own biological kingdom'
        ]
    },
    fauna: {
        patterns: ['animal', 'bird', 'insect', 'mammal', 'species'],
        responses: [
            '🦋 Butterflies taste with their feet!',
            '🐳 Blue whales can hear each other up to 1,000 miles away',
            '🐝 Honeybees communicate through dance'
        ]
    },
    weather: {
        patterns: ['weather', 'climate', 'rain', 'sun', 'forecast'],
        responses: [
            '⛅ Highest recorded temperature: 134°F in Death Valley',
            '🌧️ Raindrops fall at 14 mph average speed',
            '❄️ Snowflakes are always six-sided crystals'
        ]
    },
    basic: {
        patterns: ['hello', 'hi', 'help'],
        responses: [
            'Hello! 🌻 How can I help you connect with nature today?',
            'Hi there! 🌿 Ask about plants, animals, or weather!',
            'Nature facts at your service! 🌼 What would you like to know?'
        ]
    }
};

const defaultResponses = [
    '🌍 Earth has over 3 trillion trees! Ask me anything natural!',
    '🌼 Try asking about plants, animals, or weather patterns!',
    '🔍 Did you know? The Great Barrier Reef is visible from space!'
];

function findBestMatch(userInput) {
    const input = userInput.toLowerCase();
    return Object.entries(natureKnowledgeBase).find(([category, data]) => 
        data.patterns.some(pattern => input.includes(pattern))
    );
}

function getBotResponse(userInput) {
    const match = findBestMatch(userInput);
    const responses = match ? natureKnowledgeBase[match[0]].responses : defaultResponses;
    return responses[Math.floor(Math.random() * responses.length)];
}
