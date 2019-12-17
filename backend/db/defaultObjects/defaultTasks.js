defaultDuration = 100;
duration=[];
duration['Daily'] = 100;
duration['Weekly'] = 300;
duration['Monthly'] = 1200;
duration['Events'] = 1000;
duration['Encounters'] = 1000;

const defaultCreatures = [
//----------------------------Physical-----------------------------------
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
//----------------------------Mental-----------------------------------
    {
        name: "Bookworm",
        description: "Read a book for 30 minutes.",
        type: "Mental",
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
        name: "Keyboarding",
        description: "Learn programing for 30 minutes.",
        type: "Mental",
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
        name: "Codemancer's Wrath",
        description: "Complete one CodeWars task.",
        type: "Mental",
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
        name: "Calm down!",
        description: "Meditate for 20 minutes.",
        type: "Mental",
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
        name: "Page-turner",
        description: "Read one chapter.",
        type: "Mental",
        category: "Encounters",
        duration: defaultDuration,
        reward: {
            exp: 50,
            gold: 50
        },
        penalty: 70,
        done: false
    },
//----------------------------Utility-----------------------------------
    {
        name: "Dirty Dancing",
        description: "Clean a bathroom.",
        type: "Utility",
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
        name: "Hell's Kitchen",
        description: "Clean a kitchen.",
        type: "Utility",
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
        name: "Baggar",
        description: "Take the trash out.",
        type: "Utility",
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
        name: "Fifth horseman",
        description: "Wash the car.",
        type: "Utility",
        category: "Monthly",
        duration: defaultDuration,
        reward: {
            exp: 1200,
            gold: 1200
        },
        penalty: 150,
        done: false
    },
    {
        name: "Suction!",
        description: "Vacuum Your house.",
        type: "Utility",
        category: "Encounters",
        duration: defaultDuration,
        reward: {
            exp: 50,
            gold: 50
        },
        penalty: 150,
        done: false
    },
    {
        name: "Wunderbaum",
        description: "Decorate christmas tree.",
        type: "Utility",
        category: "Events",
        duration: defaultDuration,
        reward: {
            exp: 1000,
            gold: 1000
        },
        penalty: 200,
        done: false
    },
    {
        name: "Jack-o'-lantern",
        description: "Prepare for Halloween.",
        type: "Utility",
        category: "Events",
        duration: defaultDuration,
        reward: {
            exp: 1000,
            gold: 1000
        },
        penalty: 200,
        done: false
    },
]

defaultCreatures.forEach(element => {
    element.duration = duration[element.category]
});

module.exports = defaultCreatures;