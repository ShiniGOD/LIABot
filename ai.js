function getBotResponse(userMessage) {
    const natureResponses = {
        'hello': 'Hello! 🌻 I\'m Lia, your nature companion! How can I help?',
        'hi': 'Hi there! 🌿 Lia here - ask me anything about nature!',
        'plants': 'Plants are amazing! Lia says they can improve air quality!',
        'weather': 'Lia knows: Weather patterns create nature\'s rhythms!',
        'tree': 'Did you know? 🌳 Trees communicate through root networks!',
        'animal': 'Animal fact from Lia: Octopuses have three hearts!',
        'help': 'Lia can help with plants, animals, and weather questions!',
        'default': 'Nature is fascinating! 🌱 What would you like Lia to explain?'
    };

    userMessage = userMessage.toLowerCase();
    return natureResponses[userMessage] || natureResponses['default'];
}
