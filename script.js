async function getBotResponse(userMessage) {
    const API_KEY = 'sk-abcdef1234567890abcdef1234567890abcdef12'; // 🔑 Replace with your actual key
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are a friendly nature expert. Provide concise, engaging answers about plants, animals, ecosystems, and environmental conservation. Use emojis and simple language suitable for all ages."
                }, {
                    role: "user",
                    content: userMessage
                }],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json(); // Log the error details
            console.error('API Error:', errorData);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error; // Re-throw the error to handle it in sendMessage
    }
}
