const bcrypt = require('bcrypt');
const _ = require('lodash');

const transactional = initializer => async (model, models) => {
  let result;
  const session = await model.startSession();
  await session.withTransaction(async () => {
    result = await initializer(models);
  });
  return result;
};

const hashPassword = async password => await bcrypt.hash(password, await bcrypt.genSalt(10));

const createModelBatch = async (model, data) => {
  const createdDocuments = [];
  for (let modelData of data) {
    const createdDocument = new model(modelData);
    createdDocuments.push(createdDocument);
    await createdDocument.save();
  }
  return createdDocuments;
};

const arrayWithCount = count => fn => [...Array(count).keys()].map(fn);

///Tu zaczynacie pisać

const createCharacters = async (prefix, count, models) => {
  const characterData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb1"+ x,
      name: prefix + x,
      level: 10 + x,
      health: 10*x,
      exp_points: 100*x,
      physical_power: 15 + x,
      magical_power: 20 + x, 
      class: "Druid",
      avatar: "default",
      questbook_id: "5de953c6291e7d14b4e2be3" + x,
      inventory_id: "5de953c6291e7d14b4e2be2" + x,
      guilds: [
        "5df2fc8275cf270f44fabb4"+ x,
        "5df2fc8275cf270f44fabb5"+ (x+2),
      ]
    };
  });
  return await createModelBatch(models.character, characterData);
};


// const createCharacter = async (prefix, models) => {
//   const characters = await createCharacters(prefix, 3, models);
//   return characters[0];
// };

const createUsers = async (prefix, count, models) => {
  const password = await hashPassword('Task-Wars-Admin');
  const userData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb0" + x,
      email: prefix + x + '@email.com',
      password,
      character_id: "5df2fc8275cf270f44fabb1" + x,
      isAdmin: false
    };
  });
  return await createModelBatch(models.user, userData);
};

const createCreatures = async (prefix, count, models) => {
  const creatureData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb5"+ x,
      name: prefix + x,
      level: 10 + x,
      health: 10*x,
      physical_power: 15 + x,
      physical_resistance: 10 + x,
      magical_power: 20 + x,
      magical_resistance: 25 + x,
      reward: 50+x,
      duration: x+6,
      task_to_dmg: "5df2fc8275cf270f44fabb6"+ x,
    };
  });
  return await createModelBatch(models.creature, creatureData);
};

const createGuilds = async (prefix, count,  models) => {
  const guildData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb4" + x,
      name: prefix + x,
      leader: "5df2fc8275cf270f44fabb1"+ x,
      members: [
        "5df2fc8275cf270f44fabb1"+ x,
      ],
      type: "Utility",
      current_fight: "5df2fc8275cf270f44fabb5"+ x,
    };
  });
  return await createModelBatch(models.guild, guildData);
};

const createInventories = async (/*prefix,*/ count, /*division,*/ models) => {
  const inventoryData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb2" + x,
      backpack: [
        "5df2fc8275cf270f44fabb7"+(x*1),
        "5df2fc8275cf270f44fabb7"+(x*2),
        "5df2fc8275cf270f44fabb7"+(x*3)
      ],
      gold: x*500
    };
  });
  return await createModelBatch(models.inventory, inventoryData);
};

const createItem = async (prefix, count, models) => {
  const itemData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb7" + x,
      name: prefix + x,
      slot: "Weapon",
      description: "Opis itemka" + x,
      effect: "Magic_power",
      effect_value: x,
      price: 100*x,
      equipped: false
    };
  });
  return await createModelBatch(models.item, itemData);
};

const createQuestbook = async (/*prefix,*/ count, /*division,*/ models) => {
  const questbookData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb3" + x,
      tasks: [
        "5df2fc8275cf270f44fabb6"+(x*1),
        "5df2fc8275cf270f44fabb6"+(x*2),
        "5df2fc8275cf270f44fabb6"+(x*3)
      ]
    };
  });
  return await createModelBatch(models.questbook, questbookData);
};

const createTask = async (prefix, count, models) => {
  const taskData = arrayWithCount(count)(x => {
    return {
      _id: "5df2fc8275cf270f44fabb6"+ x,
      name: prefix + x,
      description: "Opis taska" + x,
      type: "Utility",
      category: "Daily",
      duration: (x+1),
      reward: {
        exp: (100+x),
        gold: (50+x)
      },
      penalty: (5+x),
      done: false
    };
  });
  return await createModelBatch(models.task, taskData);
};

// const createTeams = async (prefix, users, models) => {
//   const teamsData = arrayWithCount(users.length / 2)(x => {
//     return {
//       name: prefix + 'Team_' + x,
//       players: {
//         first: users[x],
//         second: users[users.length - 1 - x],
//       },
//     };
//   });
//   return await createModelBatch(models.Team, teamsData);
// };

// const alignLeaguesToTeams = async leagues => {
//   for (let league of leagues) {
//     for (let leagueTeam of league.teams) {
//       await leagueTeam.team.updateOne({ $push: { leagues: league } });
//     }
//   }
// };

// const createLeagues = async (prefix, count, manyTeams, division, owner, models) => {
//   const leagueData = arrayWithCount(count)(x => {
//     return {
//       name: prefix + 'League_' + x,
//       division,
//       teams: manyTeams[x].map(team => {
//         return { team };
//       }),
//       owner,
//     };
//   });

//   const leagues = await createModelBatch(models.League, leagueData);
//   await alignLeaguesToTeams(leagues);
//   await owner.updateOne({ $push: { ownedLeagues: { $each: leagues } } });
//   return leagues;
// };

// const createLeague = async (prefix, teams, division, owner, models) => {
//   const leagues = await createLeagues(prefix, 1, [teams], division, owner, models);
//   return leagues[0];
// };

// const createMatchesData = (league, scheduled) => {
//   const matchesData = [];
//   const teams = [...league.teams];
//   teams.forEach((x, i) => {
//     teams.slice(i + 1, teams.length).forEach(y => {
//       matchesData.push({
//         league,
//         teams: {
//           first: x.team,
//           second: y.team,
//         },
//         date: { scheduled },
//       });
//     });
//   });
//   return matchesData;
// };

// const startLeague = async (prefix, league, models) => {
//   const now = new Date(Date.now());
//   const matchesData = createMatchesData(league, now);
//   const matches = await models.Match.insertMany(matchesData);
//   await league.updateOne({ $push: { matches: matches }, status: 'pending', date: { started: now } });
// };

// const alignTeamsToUsers = async teams => {
//   for (let team of teams) {
//     const { first, second } = team.players;
//     await first.updateOne({ $push: { teams: team } });
//     await second.updateOne({ $push: { teams: team } });
//   }
// };

// const alignLeaguesToDivision = async (leagues, division) => {
//   await division.updateOne({ $push: { leagues: { $each: leagues } } });
// };

// const teamInitializer = async models => {
//   const prefix = 'Team_';
//   const division = await createDivision(prefix, models);
//   const users = await createUsers(prefix, 6, division, models);
//   let teams = await createTeams(prefix, users, models);
//   await alignTeamsToUsers(teams);

//   for (let i = 0; i < 10; ++i) {
//     teams = await createTeams(prefix + `_${i}_`, _.shuffle(users), models);
//     await alignTeamsToUsers(teams);
//   }
// };

// const leagueInitializer = async models => {
//   const prefix = 'League_';
//   const division = await createDivision(prefix, models);
//   const users = await createUsers(prefix, 4, division, models);
//   const owner = users.find(val => val.nickname === 'League_User_0');
//   const teams = await createTeams(prefix, users, models);
//   await alignTeamsToUsers(teams);
//   const league = await createLeague(prefix, teams, division, owner, models);
//   await alignLeaguesToDivision([league], division);
// };

// const matchInitializer = async models => {
//   const prefix = 'Match_';
//   const division = await createDivision(prefix, models);
//   const users = await createUsers(prefix, 10, division, models);
//   const owner = users.find(val => val.nickname === 'Match_User_0');
//   const teams = await createTeams(prefix, users, models);
//   await alignTeamsToUsers(teams);
//   const league = await createLeague(prefix, teams, division, owner, models);
//   await alignLeaguesToDivision([league], division);
//   await startLeague(prefix, league, models);
// };
//przykład
// const userInitializer = async models => {
//   const prefix = 'User_';
//   // const division = await createDivision(prefix, models);
//   await createUsers(prefix, 1, /*division,*/ models);
// };

const userInitializer = async models => {
  const prefix = 'user';
  await createUsers(prefix, 3, models);
};

const characterInitializer = async models => {
  const prefix = 'Character_';
  await createCharacters(prefix, 3, models);
};

const creatureInitializer = async models => {
  const prefix = 'Mob_';
  await createCreatures(prefix, 6, models);
};

const guildInitializer = async models => {
  const prefix = 'Guild_';
  await createGuilds(prefix, 6, models);
};

const inventoryInitializer = async models => {
  // const prefix = 'User_';
  // const division = await createDivision(prefix, models);
  await createInventories(/*prefix,*/ 3, /*division,*/ models);
};

const itemInitializer = async models => {
  const prefix = 'Item_';
  await createItem(prefix, 10, models);
};

const questbookInitializer = async models => {
  // const prefix = 'User_';
  // const division = await createDivision(prefix, models);
  await createQuestbook(/*prefix,*/ 3, /*division,*/ models);
};

const taskInitializer = async models => {
  const prefix = 'Task_';
  await createTask(prefix, 10,  models);
};

const defaultInitializers = new Map([
  ['task', taskInitializer],
  ['questbook', questbookInitializer],
  ['item', itemInitializer],
  ['inventory', inventoryInitializer],
  ['creature', creatureInitializer],
  ['guild', guildInitializer],
  ['character', characterInitializer],
  ['user', userInitializer]
]);

//To zostawiacie bez zmian
const initialize = async (models, filterFn = () => true, initializers = defaultInitializers) => {
  for (let modelName of Object.keys(models).filter(filterFn)) {
    if (!initializers.has(modelName)) {
      console.log(`[MongoDB] Could not find initializer for ${modelName}`);
      continue;
    }
    console.log(`[MongoDB] Initializing data for ${modelName}`);
    const initializer = initializers.get(modelName);
    console.log(initializer);
    await transactional(initializer)(models[modelName], models);
  }
};

module.exports = initialize;
