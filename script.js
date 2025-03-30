let currentPersonality = "You are a helpful assistant.";

function savePersonality() {
    currentPersonality = document.getElementById('personality').value || "You are a helpful assistant.";
    addMessage("Personality updated!", 'bot');
}

function addMessage(text, sender) {
    const chatHistory = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const text = userInput.value.trim();
    
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';

    // Replace with your actual AI API call
    const response = await mockAIResponse(text);
    addMessage(response, 'bot');
}

// Mock AI response (Replace with actual API call)
async function mockAIResponse(userMessage) {
    const prompt = `${currentPersonality}\n\nUser: ${userMessage}\nBot:`;
    
    // In real implementation, send prompt to AI API
    // Example using OpenAI:
    /*
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
    */
    
    // Mock response
    return "This is a mock response. Implement API integration as shown above.";
}
