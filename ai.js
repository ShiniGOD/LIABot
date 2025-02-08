function getBotResponse(userMessage) {
    const liaResponses = {
        'hello': 'Greetings! 🌻 I\'m Lia, your nature companion. How can I assist you today?',
        'hi': 'Hello there! 🌿 Lia here - what nature wonders shall we explore?',
        'plants': 'Did you know? 🌱 Plants purify air and boost moods! Lia recommends having at least one plant per room.',
        'weather': 'Lia\'s weather tip: Clouds move at 30-120 mph! Each type tells a different weather story.',
        'tree': '🌳 Fun fact from Lia: A single tree can provide oxygen for 4 people daily!',
        'animal': '🦉 Lia says: Animals have amazing adaptations! Did you know octopuses have blue blood?',
        'help': 'Lia can share facts about: Plants • Animals • Weather • Ecosystems • Conservation',
        'default': 'Nature whispers secrets... 🌿 What would you like Lia to explain?'
    };

    userMessage = userMessage.toLowerCase();
    return liaResponses[userMessage] || liaResponses['default'];
}
