function getBotResponse(userMessage) {
    const natureResponses = {
        'hello': 'Hello! 🌻 Welcome to Nature Assistant. How can I help you connect with nature today?',
        'hi': 'Hi there! 🌿 Ready to explore the wonders of nature? What would you like to know?',
        'plant': 'Plants are nature\'s air purifiers! Some great indoor plants are:\n- Snake Plant\n- Peace Lily\n- Spider Plant\n- Aloe Vera',
        'weather': 'Nature\'s mood changes with the weather! Would you like to know about:\n- Seasonal changes\n- Weather patterns\n- Climate effects on ecosystems?',
        'animal': 'The animal kingdom is fascinating! Let me tell you about:\n🐝 Pollinators and their importance\n🦉 Nocturnal animals\n🐳 Marine life wonders',
        'garden': 'Starting a garden? Here are some tips:\n1. Choose native plants\n2. Ensure proper sunlight\n3. Water consistently\n4. Use natural fertilizers',
        'help': 'I can help with:\n🌱 Plant care\n☀️ Weather patterns\n🦜 Animal facts\n🌳 Ecosystems\n🍄 Fungi networks\nJust ask!',
        'default': 'Nature is full of wonders! 🌍 Try asking about:\n- Photosynthesis\n- Rainforest ecosystems\n- Ocean conservation\n- Endangered species'
    };

    const lowerMessage = userMessage.toLowerCase();
    for(const [keyword, response] of Object.entries(natureResponses)) {
        if(lowerMessage.includes(keyword)) return response;
    }
    return natureResponses['default'];
}
