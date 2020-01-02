const { validateGuild } = require('../models/guild');
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

router.post('/', async (req, res) => {
  const Guild = res.locals.models.guild;
  const { error } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findOne({ name: req.body.name });
  if (guild) return res.status(400).send('Guild with this name already registered.');

  guild = new Guild(req.body);
  await guild.save();
  res.send(guild);
});

router.put('/:id/members', async (req, res) => {
  const Guild = res.locals.models.guild;
  const Character = res.locals.models.character;

  const { error } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  const character = await Character.findById(req.body.members);
  if (!character) return res.status(404).send('The character with given ID was not found');

  guild = await Guild.findByIdAndUpdate(req.params.id, { members: req.body.members }, { new: true });

  res.send(guild);
});

router.put('/:id/current_fight', async (req, res) => {
  const Guild = res.locals.models.guild;
  const Character = res.locals.models.character;
  const Inventory = res.locals.models.inventory;

  const { error } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  // const creature = await Creature.findById(req.body.current_fight);
  // if (!creature) return res.status(404).send('The creature with given ID was not found');

  guild = await Guild.findByIdAndUpdate(req.params.id, { current_fight: req.body.current_fight }, { new: true });

  // if(guild.current_fight.health <= 0) {
  //   updateMembersStats(guild, Character, Inventory)
  // }
  
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

  const { error } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  guild = await Guild.findByIdAndUpdate(req.params.id, { flag: req.body.flag }, { new: true });

  res.send(guild);
});

module.exports = router;
