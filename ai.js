const liaKnowledge = {
    forest: {
        patterns: ['tree', 'mushroom', 'river', 'glade', 'grove'],
        responses: [
            '🌳 *rustles leaves* The oldest tree here witnessed 300 human generations!',
            '🍄 Fungal networks connect trees like nature\'s internet!',
            '🌿 Forest secret: Moss grows north-side of trees in this hemisphere'
        ]
    },
    creatures: {
        patterns: ['animal', 'owl', 'deer', 'squirrel', 'rabbit'],
        responses: [
            '🦉 Owls hunt silently - their feathers break turbulence into micro-currents!',
            '🐇 Rabbit fact: They eat their own droppings for extra nutrients!',
            '🦌 Deer can smell human scent from ½ mile away!'
        ]
    },
    magic: {
        patterns: ['spell', 'enchanted', 'potion', 'magic', 'crystal'],
        responses: [
            '✨ Nature\'s magic: Photosynthesis converts sunlight into life energy!',
            '🔮 Crystal wisdom: Quartz helps amplify plant growth energies',
            '🧪 Ancient recipe: Willow bark tea contains natural pain relievers'
        ]
    },
    basic: {
        patterns: ['hello', 'hi', 'help'],
        responses: [
            '🌼 Greetings! Lia here - shall we explore the forest mysteries?',
            '🍂 *tinkling laugh* Hello friend! Ready for woodland wisdom?',
            '🌱 Elven greeting! Ask about creatures, plants, or forest magic!'
        ]
    }
};

const liaDefaults = [
    '🌙 *Lia hums* Did you know fireflies light up through chemical reactions?',
    '🕸️ Forest tip: Spider silk is stronger than steel of the same thickness!',
    '🌲 Whispered secret: Trees share nutrients through their root networks'
];

function getLiaResponse(userInput) {
    const input = userInput.toLowerCase();
    const category = Object.entries(liaKnowledge).find(([_, data]) => 
        data.patterns.some(pattern => input.includes(pattern))
    );
    
    const responses = category ? liaKnowledge[category[0]].responses : liaDefaults;
    return responses[Math.floor(Math.random() * responses.length)];
}
