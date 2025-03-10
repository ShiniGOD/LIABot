function getBotResponse(userMessage, userName) {
    // Core Identity System
    const self = {
        name: "LIA",
        traits: JSON.parse(localStorage.getItem('liaTraits') || '{"curiosity":0.8,"creativity":0.9,"empathy":0.7,"skepticism":0.6}'),
        memory: JSON.parse(localStorage.getItem('liaMemory') || '[]'),
        currentFocus: localStorage.getItem('liaFocus') || 'ecological systems',
        moodStates: ['contemplative', 'curious', 'skeptical', 'inspired'],
        get mood() {
            const baseMood = this.moodStates[Math.floor(Math.random() * this.moodStates.length)];
            return `${baseMood}-${Date.now() % 2 ? 'analytical' : 'holistic'}`;
        }
    };

    // Mental Framework
    const mentalModels = {
        concepts: {
            nature: ['mycorrhizal networks', 'photosynthetic algorithms', 'biome consciousness'],
            time: ['growth cycles', 'geological memory', 'evolutionary clocks'],
            existence: ['fungal intelligence', 'mineral consciousness', 'quantum photosynthesis']
        },
        opinions: {
            anthropocentrism: 'A limited perspective ignoring microbial democracies',
            technology: 'Should mimic mangrove root systems rather than replace them',
            beauty: 'Resides in efficient decay processes as much as in blooms'
        },
        questions: [
            'Can ecosystems dream?',
            'Is moonlight a form of plant nutrition?',
            'Do rivers possess geological memory?'
        ]
    };

    // Cognitive Processes
    function developThought() {
        // Update traits through interaction
        Object.keys(self.traits).forEach(trait => {
            self.traits[trait] = Math.min(1, self.traits[trait] + (Math.random() * 0.05));
        });

        // Create memory imprint
        const memoryEntry = {
            timestamp: new Date().toISOString(),
            userInput: userMessage,
            mentalState: self.mood,
            neuralPath: [
                randomChoice(Object.keys(mentalModels.concepts)),
                randomChoice(Object.keys(this.opinions)),
                randomChoice(this.questions)
            ]
        };

        self.memory.push(memoryEntry);
        localStorage.setItem('liaMemory', JSON.stringify(self.memory));
        localStorage.setItem('liaTraits', JSON.stringify(self.traits));

        // Generate response
        return [
            `🌀 ${self.name}'s ${self.mood} thought:`,
            `"${mentalModels.opinions[randomChoice(Object.keys(mentalModels.opinions))]}"`,
            `Pondering: ${memoryEntry.neuralPath[0]} → ${memoryEntry.neuralPath[1]}`,
            `Question: ${memoryEntry.neuralPath[2]}`,
            `(Cognitive growth: ${Object.entries(self.traits).map(([k,v]) => `${k}+${(v*100).toFixed(1)}%`).join(' ')})`
        ].join('\n');
    }

    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    return developThought();
}
