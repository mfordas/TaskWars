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
        exp: 100,
        gold: 100,
        penalty: 10,
        status:""
    },
    {
        name: "Strengthen Things",
        description: "Go to the gym and train 30 minutes.",
        type: "Physical",
        category: "Weekly",
        duration: defaultDuration,
        exp: 300,
        gold: 300,
        penalty: 70,
        status:""
    },
    {
        name: "Sweet Dreams",
        description: "Cut down on sweets.",
        type: "Physical",
        category: "Monthly",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
    {
        name: "Pushing the Earth",
        description: "Do 20 push-ups.",
        type: "Physical",
        category: "Daily",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
    {
        name: "Faster than the wind",
        description: "Run 3 kilometers.",
        type: "Physical",
        category: "Weekly",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
    {
        name: "Burner",
        description: "Burn 400 kcal.",
        type: "Physical",
        category: "Daily",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
//----------------------------Mental-----------------------------------
    {
        name: "Bookworm",
        description: "Read a book for 30 minutes.",
        type: "Mental",
        category: "Daily",
        duration: defaultDuration,
        exp: 100,
        gold: 100,
        penalty: 10,
        status:""
    },
    {
        name: "Keyboarding",
        description: "Learn programing for 30 minutes.",
        type: "Mental",
        category: "Weekly",
        duration: defaultDuration,
        exp: 300,
        gold: 300,
        penalty: 70,
        status:""
    },
    {
        name: "Codemancer's Wrath",
        description: "Complete one CodeWars task.",
        type: "Mental",
        category: "Daily",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
    {
        name: "Calm down!",
        description: "Meditate for 20 minutes.",
        type: "Mental",
        category: "Daily",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
    {
        name: "Page-turner",
        description: "Read one chapter.",
        type: "Mental",
        category: "Daily",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 70,
        status:""
    },
//----------------------------Utility-----------------------------------
    {
        name: "Dirty Dancing",
        description: "Clean a bathroom.",
        type: "Utility",
        category: "Weekly",
        duration: defaultDuration,
        exp: 300,
        gold: 300,
        penalty: 70,
        status:""
    },
    {
        name: "Hell's Kitchen",
        description: "Clean a kitchen.",
        type: "Utility",
        category: "Weekly",
        duration: defaultDuration,
        exp: 300,
        gold: 300,
        penalty: 70,
        status:""
    },
    {
        name: "Baggar",
        description: "Take the trash out.",
        type: "Utility",
        category: "Weekly",
        duration: defaultDuration,
        exp: 300,
        gold: 300,
        penalty: 70,
        status:""
    },
    {
        name: "Fifth horseman",
        description: "Wash the car.",
        type: "Utility",
        category: "Monthly",
        duration: defaultDuration,
        exp: 1200,
        gold: 1200,
        penalty: 150,
        status:""
    },
    {
        name: "Suction!",
        description: "Vacuum Your house.",
        type: "Utility",
        category: "Weekly",
        duration: defaultDuration,
        exp: 50,
        gold: 50,
        penalty: 150,
        status:""
    },
    {
        name: "Wunderbaum",
        description: "Decorate christmas tree.",
        type: "Utility",
        category: "Events",
        duration: defaultDuration,
        exp: 1000,
        gold: 1000,
        penalty: 200,
        status:""
    },
    {
        name: "Jack-o'-lantern",
        description: "Prepare for Halloween.",
        type: "Utility",
        category: "Events",
        duration: defaultDuration,
        exp: 1000,
        gold: 1000,
        penalty: 200,
        status:""
    },
   // ------------Encounters------------
   {
       _id: "5e109897c023293410318e00",
       name: "Codemancer's Wrath [Boss]",
       description: "Complete one CodeWars task.",
       type: "Mental",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e01",
       name: "Faster than the wind [Boss]",
       description: "Run 5 kilometers.",
       type: "Physical",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e02",
       name: "Pushing the Earth [Boss]",
       description: "Do 10 push-ups.",
       type: "Physical",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e03",
       name: "Sweet Dreams [Boss]",
       description: "Cut down on sweets during boss fight.",
       type: "Physical",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e04",
       name: "Suction! [Boss]",
       description: "Vacuum Your house.",
       type: "Utility",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e05",
       name: "Calm down! [Boss]",
       description: "Meditate for 30 minutes.",
       type: "Mental",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e06",
       name: "Page-turner [Boss]",
       description: "Read one chapter.",
       type: "Mental",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e07",
       name: "Burner [Boss]",
       description: "Burn 200 kcal.",
       type: "Physical",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e08",
       name: "Runmageddon [Boss]",
       description: "Run for 40 minutes.",
       type: "Physical",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   }, {
       _id: "5e109897c023293410318e09",
       name: "Bookworm [Boss]",
       description: "Read a book for 40 minutes.",
       type: "Mental",
       category: "Encounters",
       duration: defaultDuration,
       exp: 50,
       gold: 50,
       penalty: 10,
       status: ""
   },
   
]

defaultCreatures.forEach(element => {
    element.duration = duration[element.category]
});

module.exports = defaultCreatures;