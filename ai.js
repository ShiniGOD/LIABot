const natureKnowledgeBase = {
    flora: {
        patterns: ['plant', 'tree', 'flower', 'leaf', 'photosynthesis'],
        responses: [
            '🌱 Did you know a sunflower tracks the sun across the sky? This is called heliotropism!',
            '🌳 The Amazon Rainforest produces 20% of the world\'s oxygen',
            '🍄 Fungi have their own biological kingdom separate from plants and animals'
        ]
    },
    fauna: {
        patterns: ['animal', 'bird', 'insect', 'mammal', 'species'],
        responses: [
            '🦋 Butterflies taste with their feet! <img src="butterfly-icon.png" class="nature-icon">',
            '🐳 Blue whales can hear each other up to 1,000 miles away',
            '🐝 Honeybees communicate through dance movements'
        ]
    },
    weather: {
        patterns: ['weather', 'climate', 'rain', 'sun', 'forecast'],
        responses: [
            '⛅ The highest temperature ever recorded was 134°F (56.7°C) in Death Valley',
            '🌧️ Raindrops fall at an average speed of 14 mph',
            '❄️ Snowflakes are always six-sided crystals'
        ]
    }
};

const defaultResponses = [
    '🌍 Nature trivia: Earth has over 3 trillion trees! What would you like to explore?',
    '🌼 Try asking about plants, animals, or weather patterns!',
    '🔍 Did you know? The Great Barrier Reef can be seen from space!'
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
