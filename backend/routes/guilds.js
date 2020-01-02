const {
  validateGuild
} = require('../models/guild');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const Guild = res.locals.models.guild;
  const guild = await Guild.find();
  res.send(guild);
});

router.get('/:id', async (req, res) => {
  const Guild = res.locals.models.guild;
  const guild = await Guild.findById(req.params.id);
  if (!guild) res.status(404).send(`Guild with id ${req.params.id} not found`);
  res.send(guild);
});

router.get('/leader/:leader', async (req, res) => {
  const Guild = res.locals.models.guild;
  const guild = await Guild.find({
    leader: req.params.leader
  });
  if (!guild) res.status(404).send(`Guild with leader id ${req.params.leader} not found`);
  res.send(guild);
});

router.get('/members/:members', async (req, res) => {
  const Guild = res.locals.models.guild;
  const guild = await Guild.find({
    members: req.params.members
  });
  if (!guild) res.status(404).send(`Guild with leader id ${req.params.members} not found`);
  res.send(guild);
});

router.get('/search/:type&:tags?', async (req, res) => {
  const Guild = res.locals.models.guild;

  const typeParam = req.params.type;
  const tagsArray = req.params.tags ? req.params.tags.split('_') : '';

  const searchObj = () => {
    if (typeParam != 'All')
      return {
        type: typeParam
      };
    else
      return;
  }

  const guild = await Guild.find(searchObj()).sort('name');
  if (!guild) res.status(404).send(`Guild with type ${req.params.type} not found`);

  const result = filterByValue(guild, tagsArray)

  res.send(result);
});

router.post('/', async (req, res) => {
  const Guild = res.locals.models.guild;
  const {
    error
  } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findOne({
    name: req.body.name
  });
  if (guild) return res.status(400).send('Guild with this name already registered.');

  guild = new Guild(req.body);
  await guild.save();
  res.send(guild);
});

router.put('/:id/members', async (req, res) => {
  const Guild = res.locals.models.guild;
  const Character = res.locals.models.character;

  const {
    error
  } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  const character = await Character.findById(req.body.members);
  if (!character) return res.status(404).send('The character with given ID was not found');

  const membersArray = guild.members;
  let memberExist = membersArray.includes(req.body.members);
  if (memberExist) return res.status(404).send('The member with given ID already exist');
  else membersArray.push(req.body.members);

  guild = await Guild.findByIdAndUpdate(req.params.id, {
    members: membersArray
  }, {
    new: true
  });

  res.send(guild);
});

router.put('/:id/current_fight', async (req, res) => {
  const Guild = res.locals.models.guild;
  const Character = res.locals.models.character;
  const Inventory = res.locals.models.inventory;

  const {
    error
  } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  // const creature = await Creature.findById(req.body.current_fight);
  // if (!creature) return res.status(404).send('The creature with given ID was not found');

  guild = await Guild.findByIdAndUpdate(req.params.id, {
    current_fight: req.body.current_fight
  }, {
    new: true
  });

  if(guild.current_fight.duration === -2147483647) {
    console.log("done");
    // updateMembersStats(guild, Character, Inventory)
  }
  
  res.send(guild);
});

// updateMembersStats = (guild, characterModel, inventoryModel) => {
//   const expReward = guild.current_fight.exp/guild.members.length;
//   const goldReward = guild.current_fight.gold/guild.members.length;
//   guild.members.map(async (memberID) => {
//     const member = await characterModel.findById(memberID);
//     const memberInventory = await inventoryModel.findById(member.inventory_id);
//     const memberExp = member.exp_points;
//     const memberGold = memberInventory.gold;

//     // await characterModel.findByIdAndUpdate(memberID, { exp_points: (memberExp + expReward)});
//     await inventoryModel.findByIdAndUpdate(member.inventory_id, { gold: (memberGold + goldReward)});
    
//   })
// }


router.put('/:id/flag', async (req, res) => {
  const Guild = res.locals.models.guild;

  const {
    error
  } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  guild = await Guild.findByIdAndUpdate(req.params.id, {
    flag: req.body.flag
  }, {
    new: true
  });

  res.send(guild);
});

function filterByValue(guild, tags) {
  if (!tags)
    return guild;
  return guild.filter(o => {
    return tags.every(t => {
      return o.name.concat(o.description, o.type).toLowerCase().includes(t);
    })
  })
}

module.exports = router;