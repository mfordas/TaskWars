defaultDuration = 100;
duration=[];
duration['Daily'] = 100;
duration['Weekly'] = 300;
duration['Monthly'] = 1200;
duration['Events'] = 1000;
duration['Encounters'] = 1000;

const defaultCreatures = [
    {
        name: "Runmageddon",
        description: "Run for 30 minutes.",
        type: "Physical",
        category: "Daily",
        duration: defaultDuration,
        reward: {
            exp: 100,
            gold: 100
        },
        penalty: 10,
        done: false
    },
    {
        name: "Strengthen Things",
        description: "Go to the gym and train 30 minutes.",
        type: "Physical",
        category: "Weekly",
        duration: defaultDuration,
        reward: {
            exp: 300,
            gold: 300
        },
        penalty: 70,
        done: false
    },
    {
        name: "Sweet Dreams",
        description: "Cut down on sweets.",
        type: "Physical",
        category: "Encounters",
        duration: defaultDuration,
        reward: {
            exp: 50,
            gold: 50
        },
        penalty: 70,
        done: false
    },
    {
        name: "Pushing the Earth",
        description: "Do 20 push-ups.",
        type: "Physical",
        category: "Encounters",
        duration: defaultDuration,
        reward: {
            exp: 50,
            gold: 50
        },
        penalty: 70,
        done: false
    },
    {
        name: "Faster than the wind",
        description: "Run 3 kilometers.",
        type: "Physical",
        category: "Encounters",
        duration: defaultDuration,
        reward: {
            exp: 50,
            gold: 50
        },
        penalty: 70,
        done: false
    },
    {
        name: "Burner",
        description: "Burn 400 kcal.",
        type: "Physical",
        category: "Encounters",
        duration: defaultDuration,
        reward: {
            exp: 50,
            gold: 50
        },
        penalty: 70,
        done: false
    },
]

defaultCreatures.forEach(element => {
    element.duration = duration[element.category]
});

module.exports = defaultCreatures;