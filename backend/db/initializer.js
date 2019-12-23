const bcrypt = require('bcrypt');
const _ = require('lodash');
const defaultCreatures = require('./defaultObjects/defaultCreatures')
const defaultTasks = require('./defaultObjects/defaultTasks')
const defaultItems = require('./defaultObjects/defaultItems')

const transactional = initializer => async (model, models, idCatalog) => {
  let result;
  const session = await model.startSession();
  await session.withTransaction(async () => {
    result = await initializer(models, idCatalog);
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
    // return createdDocuments;
    const idArray = [];
    createdDocuments.forEach(element => {
      idArray.push(element._id);
    });
    return idArray;
};

const arrayWithCount = count => fn => [...Array(count).keys()].map(fn);

///Tu zaczynacie pisać

const createUsers = async (prefix, count, models, characterCatalog) => {
  const userPassword = await hashPassword(process.env.USER_PASSWORD);
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD);
  const adminEmail = process.env.ADMIN_EMAIL
  const userData = arrayWithCount(count)(x => {
    if(x === 0) {
      return {
        email: adminEmail,
        password: adminPassword,
        character_id: characterCatalog[x] === undefined ? null : characterCatalog[x],
        isAdmin: true,
        isVerified: true
      };
    }
    return {
      email: prefix + x + '@email.com',
      password: userPassword,
      character_id: characterCatalog[x] === undefined ? null : characterCatalog[x],
      isAdmin: false,
      isVerified: true
    };
  });
  return await createModelBatch(models.user, userData);
};

const createCharacters = async (prefix, count, models, questbookCatalog, guildCatalog, inventoryCatalog) => {
  const characterData = arrayWithCount(count)(x => {
    return {
      name: prefix + x,
      level: 10 + x,
      maxHealth: 10*x,
      health: 10*(x+1),
      exp_points: 100*(x+1),
      physical_power: 15 + x,
      magical_power: 20 + x, 
      charClass: "Druid",
      avatar: 'http://icons.iconarchive.com/icons/chanut/role-playing/256/Villager-icon.png',
      questbook_id: questbookCatalog[x] === undefined ? null : questbookCatalog[x],
      inventory_id: inventoryCatalog[x] === undefined ? null : inventoryCatalog[x],
      //guild has empty field so character is not a member of any guild by deafult
      guilds: [
      ]
    };
  });
  return await createModelBatch(models.character, characterData);
};

const createGuilds = async (prefix, count,  models, creatureCatalog) => {
  const guildData = arrayWithCount(count)(x => {
    return {
      name: prefix + x,
      //leader and members field's cannot be initilized befor character
      leader: null,
      members: [],
      type: "Utility",
      current_fight: creatureCatalog[x] === undefined ? null : creatureCatalog[x],
    };
  });
  return await createModelBatch(models.guild, guildData);
};

const createCreatures = async (prefix, count, models, taskCatalog) => {
  const creatureData = arrayWithCount(count)(x => {
    if(defaultCreatures[x] !== undefined) {
      return defaultCreatures[x];
    } else {
      return {
        name: prefix + x,
        level: 10 + x,
        maxHealth: 10*x,
        health: 10*x,
        physical_power: 15 + x,
        physical_resistance: 10 + x,
        magical_power: 20 + x,
        magical_resistance: 25 + x,
        reward: 50+x,
        duration: x+6,
        task_to_dmg: taskCatalog[x],
        picture: ''
      };
    }
  });
  return await createModelBatch(models.creature, creatureData);
};

const createInventories = async (count, models, itemCatalog) => {
  const inventoryData = arrayWithCount(count)(x => {
    return {
      backpack: [
        itemCatalog[(x+1)*1] === undefined ? null : itemCatalog[(x+1)*1],
        itemCatalog[(x+1)*2] === undefined ? null : itemCatalog[(x+1)*2],
        itemCatalog[(x+1)*3] === undefined ? null : itemCatalog[(x+1)*3],
      ],
      gold: (x+1) * 500,
    };
  });
  return await createModelBatch(models.inventory, inventoryData);
};

const createItem = async (prefix, count, models) => {
  const itemData = arrayWithCount(count)(x => {
    if(defaultItems[x] !== undefined) {
      return defaultItems[x];
    } else {
      return {
        name: prefix + x,
        slot: 'Weapon',
        description: 'Opis itemka' + x,
        effect: 'Magic_power',
        effect_value: x,
        price: 100 * x,
        equipped: false,
        picture: '',
      };
  }
  });
  return await createModelBatch(models.item, itemData);
};

const createQuestbook = async (count, models, taskCatalog) => {
  const questbookData = arrayWithCount(count)(x => {
    return {
      tasks: [
        taskCatalog[(x+1)*1] === undefined ? null : taskCatalog[(x+1)*1],
        taskCatalog[(x+1)*2] === undefined ? null : taskCatalog[(x+1)*2],
        taskCatalog[(x+1)*3] === undefined ? null : taskCatalog[(x+1)*3],
      ]
    };
  });
  return await createModelBatch(models.questbook, questbookData);
};

const createTask = async (prefix, count, models) => {
  const taskData = arrayWithCount(count)(x => {
    if(defaultTasks[x] !== undefined) {
      return defaultTasks[x];
    } else {
      return {
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
      }
    };
  });
  return await createModelBatch(models.task, taskData);
};

const userInitializer = async (models, idCatalog) => {
  const prefix = 'user';
  return await createUsers(prefix, 4, models, idCatalog["character"]);
};

const characterInitializer = async (models, idCatalog) => {
  const prefix = 'Character_';
  return await createCharacters(prefix, 4, models, idCatalog["questbook"], idCatalog["guild"], idCatalog["inventory"]);
};

const guildInitializer = async (models, idCatalog) => {
  const prefix = 'Guild_';
  return await createGuilds(prefix, defaultCreatures.length, models, idCatalog["creature"]);
};

const creatureInitializer = async (models, idCatalog) => {
  const prefix = 'Mob_';
  return await createCreatures(prefix, defaultCreatures.length, models, idCatalog["task"]);
};

const inventoryInitializer = async (models, idCatalog) => {
  return await createInventories(4, models, idCatalog["item"]);
};

const itemInitializer = async (models, idCatalog) => {
  const prefix = 'Item_';
  return await createItem(prefix, defaultItems.length, models);
};

const questbookInitializer = async (models, idCatalog) => {
  return await createQuestbook(Math.floor(defaultTasks.length/3), models, idCatalog["task"]);
};

const taskInitializer = async (models, idCatalog) => {
  const prefix = 'Task_';
  return await createTask(prefix, defaultTasks.length,  models);
};

const addCharactersToGuilds = async (characters, guilds, models) => {
  let j = 3;
  let g = [];
  for(let i=0; i<characters.length; i++) {
    const character = await models["character"].findById(characters[i]);
    if (!character) return null;

    for(let z=(j*i); z<j*i+3; z++) {
      let guild = await models["guild"].findById(guilds[z]);
      if (!guild) return null;
      await models["guild"].findByIdAndUpdate(guilds[z], { members: [character] }, { new: true });
      g.push(guilds[z]);
    }
    await models["character"].findByIdAndUpdate(characters[i], { guilds: g }, { new: true });
  }
}

const defaultInitializers = new Map([
  ['task', taskInitializer],
  ['questbook', questbookInitializer],
  ['item', itemInitializer],
  ['inventory', inventoryInitializer],
  ['creature', creatureInitializer],
  ['guild', guildInitializer],
  ['character', characterInitializer],
  ['user', userInitializer],
]);

const initOrder = [
  'task',
  'questbook',
  'item',
  'inventory',
  'creature',
  'guild',
  'character',
  'user'
];

//To zostawiacie bez zmian
const initialize = async (models, initializers = defaultInitializers) => {
  let idCatalog = [];
  for (let modelName of initOrder) {
    if (!initializers.has(modelName)) {
      console.log(`[MongoDB] Could not find initializer for ${modelName}`);
      continue;
    }
    console.log(`[MongoDB] Initializing data for ${modelName}`);
    const initializer = initializers.get(modelName);
    idCatalog[modelName] = await transactional(initializer)(models[modelName], models, idCatalog);
  }
  addCharactersToGuilds(idCatalog["character"], idCatalog["guild"], models)
};

module.exports = initialize;
