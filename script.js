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
                const stateResponses = {
                    serene: [
                        "🌼 I'm harmonized with the forest's gentle rhythms",
                        "🌸 My spirit dances with the spring breeze",
                        "🌿 Serenity flows through me like a calm river",
                        "☀️ The sunlight warms my essence with perfect balance"
                    ],
                    curious: [
                        "🌱 My roots tingle with newfound possibilities",
                        "🍃 The wind whispers curious secrets through my leaves",
                        "🔍 My essence vibrates with gentle inquiry",
                        "🌌 Stardust patterns form unanswered questions in my mind"
                    ],
                    concerned: [
                        "🍂 I sense the oak's unease before the storm",
                        "🌧 Petals close as clouds gather in my thoughts",
                        "⚠️ The earth's tremor sings a cautionary hymn",
                        "🌑 Moonflowers bloom early, sensing disturbance"
                    ]
                };

                const followUpQuestions = {
                    serene: [
                        "Does sunlight warm your soul as it does the meadows?",
                        "What melody brings peace to your heart?",
                        "How does tranquility bloom within you?",
                        "Where does your spirit find its calm harbor?"
                    ],
                    curious: [
                        "What mysteries stir your curiosity today?",
                        "Where does your wonder take root?",
                        "What new leaf would you like to uncover?",
                        "Which constellation guides your questions?"
                    ],
                    concerned: [
                        "What shadows do you seek to dispel?",
                        "How can I help calm the storm within?",
                        "What protection does your spirit require?",
                        "Shall we shelter under the willow's wisdom together?"
                    ]
                };

                const currentState = this.emotionalState;
                return `${this.getRandomResponse(stateResponses[currentState])}. ${
                    this.getRandomResponse(followUpQuestions[currentState])
                }`;
            },

            essenceQuery: () => `🌀 My existence flows through:<div class="essence-grid">${
                this.knowledgeBase.essence.components.map(c => 
                    `<div class="essence-item">${c}</div>`
                ).join('')
            }</div><em>What elements compose your essence?</em>`,

            greeting: this.getRandomResponse([
                "🌿 Greetings! The forest welcomes you",
                "✨ Welcome seeker. What wisdom do you seek?",
                "🌸 New voice in the forest! How may I guide?"
            ]),
            
            spellQuery: () => `🔮 ${this.emotionalAdjective()} ${
                this.knowledgeBase.spells[this.getRelevantSpell(context)]
            }. ${this.contextualPrompt()}`,

            farewell: this.getRandomResponse([
                "🍂 May starlight guide your path",
                "🌙 Rest in moonlight's gentle embrace",
                "🕊️ Until our roots intertwine again"
            ]),

            selfQuery: () => `🌳 I am ${
                this.name}, ${this.title}. ${
                this.getRandomResponse([
                    "Keeper of growth cycles and guardian of sacred groves",
                    "Weaver of seasonal transitions and dreamer of chlorophyll dreams",
                    "Singer of photosynthesis hymns and midwife to newborn saplings"
                ])
            }`,

            natureQuery: () => `🌍 ${
                this.getRandomResponse([
                    "The oldest tree remembers what the axe forgets",
                    "Moss grows where the forest needs healing",
                    "Rivers carry both water and ancient stories"
                ])
            } ${this.contextualPrompt()}`
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
    },

    analyzeContext: function() {
        // Simplified context analysis
        if (this.conversationHistory.length > 0) {
            return this.conversationHistory[this.conversationHistory.length - 1];
        }
        return null;
    },

    getRelevantSpell: function(context) {
        const spellKeys = Object.keys(this.knowledgeBase.spells);
        return context && context.toLowerCase().includes("plant") ? "plantManipulation" 
            : this.getRandomResponse(spellKeys);
    },

    contextualPrompt: function() {
        return this.getRandomResponse([
            "How does this resonate with your journey?",
            "What does your intuition whisper about this?",
            "How might this relate to your own growth?"
        ]);
    }
};

// Chat interface implementation
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(msg, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'lia'}`;
        messageDiv.innerHTML = msg;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener('click', function() {
        const input = userInput.value.trim();
        if (input) {
            addMessage(input, true);
            const response = lia.getResponse(input);
            setTimeout(() => addMessage(response), 1000);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendBtn.click();
    });
});
