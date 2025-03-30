let currentPersonality = "You are a helpful assistant.";
const DEEPSEEK_API_KEY = 'sk-de004f50b31a4807ba1743aa116824fd'; // 🔴 Replace with your key!
const API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions'; // Verify URL

// ... keep savePersonality() and addMessage() functions the same ...

async function getAIResponse(userMessage) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}` // Might be 'Api-Key' etc
            },
            body: JSON.stringify({
                model: "deepseek-chat", // Confirm model name
                messages: [
                    { role: "system", content: currentPersonality },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        // Adjust response parsing based on DeepSeek's format:
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('API Error:', error);
        return "Sorry, I'm having trouble connecting to the AI service.";
    }
}

// Keep sendMessage() function the same
