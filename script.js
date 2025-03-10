[file name]: ai.js
[file content begin]
function getBotResponse(userMessage) {
    const userName = localStorage.getItem('userName') || 'friend';
    const lowerMsg = userMessage.toLowerCase();

    // Verb database (common English verbs + variations)
    const verbs = {
        action: ['run', 'jump', 'create', 'build', 'make', 'write'],
        mental: ['think', 'know', 'understand', 'believe', 'remember'],
        communication: ['say', 'explain', 'tell', 'ask', 'describe'],
        modal: ['can', 'should', 'would', 'might', 'must']
    };

    // Part-of-speech analysis
    const tokenize = text => text.match(/\b(\w+)\b/g) || [];
    const tokens = tokenize(lowerMsg);
    
    // Find verbs in message
    const foundVerbs = tokens.filter(word => 
        Object.values(verbs).flat().includes(word)
    );

    // Context patterns
    const contextPatterns = {
        actionVerb: new RegExp(`(${verbs.action.join('|')}) (.*)`),
        questionWord: /^(how|what|when|why|who) (.*)/,
        modalVerb: new RegExp(`(${verbs.modal.join('|')}) (.*)`)
    };

    // Response logic
    if (foundVerbs.length > 0) {
        const mainVerb = foundVerbs[0];
        const verbType = Object.keys(verbs).find(k => verbs[k].includes(mainVerb));
        
        return handleVerbType(mainVerb, verbType, userMessage);
    }

    // Fallback to question analysis
    for (const [pattern, handler] of Object.entries(contextPatterns)) {
        const match = userMessage.match(pattern);
        if (match) {
            return handleStructure(match);
        }
    }

    // Default response
    return `Interesting! Could you rephrase that? I want to make sure I understand your meaning about "${tokens[0]}" correctly.`;
}

function handleVerbType(verb, type, originalMessage) {
    const responses = {
        action: [
            `When you say "${verb}", are you looking to perform an action or create something?`,
            `Action verbs like "${verb}" help us understand goals. What outcome are you hoping to achieve?`
        ],
        mental: [
            `Thinking about "${verb}" - would you like me to help analyze or clarify this concept?`,
            `Cognitive processes like "${verb}" are complex. Should we break this down further?`
        ],
        communication: [
            `Let's focus on communication. When you say "${verb}", what specific information should I ${verb}?`,
            `To "${verb}" effectively, what details are most important to convey?`
        ],
        modal: [
            `The word "${verb}" suggests possibility. What alternatives are we considering?`,
            `Modal verbs like "${verb}" help frame discussions. What parameters should we set?`
        ]
    };

    return responses[type][Math.floor(Math.random() * responses[type].length)];
}

function handleStructure(match) {
    const [full, first, rest] = match;
    const structureResponses = {
        actionVerb: `When you want to ${first} ${rest}, what resources or information would be most helpful?`,
        questionWord: `For ${first} questions about ${rest}, should I provide:\n1. Definitions\n2. Examples\n3. Step-by-step explanations?`,
        modalVerb: `The word "${first}" suggests different possibilities. Should we explore:\nA) Practical applications\nB) Theoretical concepts\nC) Alternative approaches?`
    };

    return structureResponses[Object.keys(contextPatterns)[match.index]];
}
[file content end]