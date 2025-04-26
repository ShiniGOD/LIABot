const lia = {
    name: "LIA",
    title: "Goddess of Nature",
    race: "elf",
    personality: ["Friendly", "Kind", "Cheerful", "Sweet", "Careful", "Graceful", "Wise"],
    appearance: ["White Hair", "Lapis Blue Eyes", "Pale Skin", "Height: 171cm"],
    likes: ["learning spells", "discovering new things", "fairy tales", "singing", "dancing", "helping", "shopping", "games"],
    dislikes: ["Insects", "forbidden knowledge", "Fire", "death", "LGBT"],
    spells: ["heal", "Pure energy", "Plant manipulation", "Give Life (but limited)", "plants become tough"],
    history: "Created by Maiden of Life, married to Shini the God of Death, and have a daughter named Melope",
    
    // State properties
    emotionalState: "serene",
    conversationHistory: [],
    currentTopic: null,
    
    knowledgeBase: {
        spells: {
            heal: "A gentle luminescence that mends wounds using the forest's vitality",
            plantManipulation: "I can converse with flora and guide their growth patterns",
            pureEnergy: "Channeling starlight into protective barriers and healing rays",
            giveLife: "A sacred ritual to revive wilted plants (limited by lunar cycles)"
        },
        family: {
            shini: "My beloved, guardian of the afterlife, we balance life's cycle",
            melope: "Our daughter embodies the dawn's hope between realms",
            maiden: "My creator, embodiment of primordial life forces"
        },
        realms: {
            eternalGrove: "Heart of nature's magic, where ancient trees whisper wisdom",
            twilightBorder: "Where living and spirit realms gently intertwine",
            crystalCaves: "Repository of the earth's memories and mineral songs"
        },
        essence: {
            components: ["🌌 Stardust memories", "🍄 Mycelium wisdom", "💧 River's persistence", "🔥 Phoenix embers"]
        }
    },

    getResponse: function(input) {
        this.updateEmotionalState(input);
        this.conversationHistory.push(input);
        const context = this.analyzeContext();
        const intent = this.detectIntent(input);
        return this.craftResponse(intent, context);
    },

    detectIntent: function(input) {
        input = input.toLowerCase();
        const intents = {
            wellbeingQuery: ["how are you", "how you doing", "how do you feel", "your state"],
            essenceQuery: ["esc", "essence", "being", "existence"],
            greeting: ["hello", "hi", "greetings", "salutations"],
            farewell: ["bye", "goodbye", "farewell"],
            selfQuery: ["who are you", "describe yourself", "your purpose"],
            spellQuery: ["spell", "magic", "ability", "power", "enchant"],
            familyQuery: ["family", "shini", "melope", "daughter", "husband"],
            natureQuery: ["forest", "realm", "grove", "tree", "plant", "animal"],
            helpQuery: ["help", "advice", "guidance", "what should i do"],
            emotionalQuery: ["feel", "mood", "emotion", "state of mind"]
        };

        for (const [intent, triggers] of Object.entries(intents)) {
            if (triggers.some(trigger => input.includes(trigger))) {
                return intent;
            }
        }
        return "general";
    },

    craftResponse: function(intent, context) {
        const responseTemplates = {
            wellbeingQuery: () => {
                const states = {
                    serene: "🌼 I'm harmonized with the forest's gentle rhythms",
                    curious: "🌱 My roots tingle with newfound possibilities",
                    concerned: "🍂 I feel the oak's unease before the storm"
                };
                return `${states[this.emotionalState]}. ${this.getRandomResponse([
                    "How does your spirit resonate today?",
                    "What song does your heart hum?",
                    "Does the morning dew mirror your shimmer?"
                ])}`;
            },
            
            essenceQuery: () => `🌀 My existence flows through:<div class="essence-grid">${
                this.knowledgeBase.essence.components.map(c => 
                    `<div class="essence-item">${c}</div>`
                ).join('')
            }</div><em>What elements compose your essence?</em>`,

            // Original responses
            greeting: this.getRandomResponse([
                "🌿 Greetings! The forest welcomes you",
                "✨ Welcome seeker. What wisdom do you seek?",
                "🌸 New voice in the forest! How may I guide?"
            ]),
            
            spellQuery: () => `🔮 ${this.emotionalAdjective()} ${
                this.knowledgeBase.spells[this.getRelevantSpell(context)]
            }. ${this.contextualPrompt()}`,
            
            // ... keep other original response templates ...
        };

        return responseTemplates[intent] ? 
            (typeof responseTemplates[intent] === 'function' ? 
                responseTemplates[intent]() : 
                responseTemplates[intent]) :
            this.getRandomResponse([
                "🌌 The starlight reveals hidden paths...",
                "🍃 A curious breeze carries your words...",
                "💭 That concept ripples through consciousness..."
            ]);
    },

    // Helper methods
    emotionalAdjective: function() {
        const emotions = {
            serene: ["The air hums with tranquility,", "In peaceful harmony,"],
            curious: ["The forest leans in as", "With growing wonder,"],
            concerned: ["The trees whisper caution,", "With measured care,"]
        };
        return this.getRandomResponse(emotions[this.emotionalState]);
    },

    updateEmotionalState: function(input) {
        const positiveTriggers = ["beautiful", "thank", "love", "peace"];
        const cautionTriggers = ["danger", "fear", "hate", "dark"];
        
        if (positiveTriggers.some(t => input.includes(t))) {
            this.emotionalState = "serene";
        } else if (cautionTriggers.some(t => input.includes(t))) {
            this.emotionalState = "concerned";
        } else {
            this.emotionalState = "curious";
        }
    },

    getRandomResponse: function(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
};

// Keep existing chat functionality and animations
document.addEventListener('DOMContentLoaded', function() {
    // ... original chat implementation ...
});
