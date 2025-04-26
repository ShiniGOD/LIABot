// script.js - Enhanced Response System
const lia = {
    // ... existing properties ...

    // New properties
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
        }
    },

    // Enhanced response handler
    getResponse: function(input) {
        this.updateEmotionalState(input);
        this.conversationHistory.push(input);
        
        const context = this.analyzeContext();
        const intent = this.detectIntent(input);
        
        return this.craftResponse(intent, context);
    },

    // New methods
    detectIntent: function(input) {
        input = input.toLowerCase();
        
        // Enhanced intent detection with synonym matching
        const intents = {
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
            greeting: this.getRandomResponse([
                `🌿 Greetings, kind soul. The wind whispers of your arrival. How may I assist?`,
                `✨ Welcome to the Eternal Grove, seeker. What wisdom do you seek today?`,
                `🌸 Ah, a new voice in the forest! How may I guide your path?`
            ]),
            
            spellQuery: () => {
                const spell = this.getRelevantSpell(context);
                return `🔮 ${this.emotionalAdjective()} When channeling ${spell}, ${
                    this.knowledgeBase.spells[spell]
                }. Would you like to know more about ${this.suggestRelatedTopic()}?`;
            },
            
            familyQuery: () => {
                const member = Object.keys(this.knowledgeBase.family).find(m => 
                    context.includes(m)
                ) || 'family';
                return `👨👩👧 ${this.familyResponseIntro()} ${
                    this.knowledgeBase.family[member]
                }. ${this.getRandomResponse([
                    "Shall I share more about our celestial bonds?",
                    "Would you like to hear how we maintain balance?",
                    "Perhaps you're curious about our realm's structure?"
                ])}`;
            },
            
            emotionalQuery: `💖 My essence currently resonates with ${this.emotionalState} energy. ${
                this.getRandomResponse([
                    "The forest's mood mirrors the crescent moon's gentle arc.",
                    "Can you feel the whispered songs in the willow's leaves?",
                    "My spirit dances with the fireflies' twilight waltz."
                ])
            }`,
            
            general: `${this.getRandomResponse([
                "🌌 The starlight reveals hidden paths - could you clarify?",
                "🍃 A curious breeze carries your words... please elaborate?",
                "💭 That concept ripples through the pond of consciousness...",
                "🌻 Let me consult the ancient blooms for guidance...",
                "🌀 Your words spiral like autumn leaves - help me understand"
            ])} ${this.contextualPrompt()}`
        };

        return typeof responseTemplates[intent] === 'function' 
            ? responseTemplates[intent]()
            : responseTemplates[intent] || responseTemplates.general;
    },

    // Helper methods
    emotionalAdjective: function() {
        const emotions = {
            serene: ["The air hums with tranquility as", "In this peaceful moment,",
                    "With calm determination,"],
            curious: ["The forest leans in as", "With growing interest,",
                     "My spirit quickens when"],
            concerned: ["The trees whisper caution as", "With measured care,",
                        "The owl's wisdom guides me to say"]
        };
        return this.getRandomResponse(emotions[this.emotionalState]);
    },

    contextualPrompt: function() {
        const lastTopic = this.conversationHistory.slice(-3).join(" ");
        const prompts = {
            spells: "Shall we explore mystical energies further?",
            family: "Would you like to continue with celestial lineages?",
            realms: "Should we delve deeper into hidden realms?"
        };
        
        const detectedTopic = Object.keys(prompts).find(topic => 
            lastTopic.includes(topic)
        );
        
        return detectedTopic 
            ? prompts[detectedTopic]
            : "What aspect of nature calls to you?";
    },

    updateEmotionalState: function(input) {
        const positiveTriggers = ["beautiful", "wonder", "thank", "love", "peace"];
        const cautionTriggers = ["danger", "fear", "hate", "attack", "dark"];
        
        if (positiveTriggers.some(t => input.includes(t))) {
            this.emotionalState = "serene";
        } else if (cautionTriggers.some(t => input.includes(t))) {
            this.emotionalState = "concerned";
        } else {
            this.emotionalState = "curious";
        }
    }
};

// Chat system upgrades
document.addEventListener('DOMContentLoaded', function() {
    // ... existing chat setup ...

    // Enhanced processing with conversation flow
    function processInput() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add message with animation
        addMessage(text, true);
        userInput.value = '';
        
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            const response = lia.getResponse(text);
            
            // Add animated response
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = response;
            tempDiv.style.opacity = '0';
            chatMessages.appendChild(tempDiv);
            
            // Animate response entry
            setTimeout(() => {
                tempDiv.style.transition = 'opacity 0.5s, transform 0.5s';
                tempDiv.style.opacity = '1';
                tempDiv.style.transform = 'translateY(0)';
            }, 50);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800 + Math.random() * 1200);
    }

    // Quick-reply handlers
    document.querySelectorAll('.quick-reply').forEach(button => {
        button.addEventListener('click', function() {
            const query = this.dataset.query;
            userInput.value = `Tell me about ${query}`;
            processInput();
        });
    });
});
