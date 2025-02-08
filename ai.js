function getBotResponse(userMessage) {
    const natureResponses = {
        'hello': 'Hello! 🌻 How can I help you connect with nature today?',
        'hi': 'Hi there! 🌿 What would you like to know about nature?',
        'plants': 'Plants are amazing! Did you know they can improve air quality and reduce stress?',
        'weather': 'The weather is always changing, just like nature itself!',
        'tree': 'Trees are essential for life - they provide oxygen and shelter for countless species.',
        'animal': 'Animals are incredible creatures with unique behaviors and adaptations.',
        'help': 'I can help you learn about plants, animals, weather, and more! Just ask!',
        'default': 'Nature is full of wonders! 🌱 What would you like to explore today?'
    };

    userMessage = userMessage.toLowerCase();
    return natureResponses[userMessage] || natureResponses['default'];
}
