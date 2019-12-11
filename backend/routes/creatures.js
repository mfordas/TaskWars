const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const { validateCreature } = require('../models/creature');
// const {User, validateUser} = require('../models/user');
// const {Character, validateCharacter} = require('../models/character');
// const {Guild, validateGuild} = require('../models/guild');
// const authorization = require('../middleware/authorization');

router.get('/', /*authorization,*/ async (req, res) => {
  const Creature = res.locals.models.creature;
  
    const creatures = await Creature.find().sort({'level' : 1 , 'name' : 1 })
    res.send(creatures);
  })

router.get('/:id', /*[authorization,*/ [validateObjectId], async (req, res) => {
  const Creature = res.locals.models.creature;

  const creature = await Creature.findById(req.params.id);
  if(!creature) return res.status(404).send('The creature with given ID was not found')

  // Not tested
  // const user = await User.findById(req.user.id);
  // const character = await Character.findById(user.character_id);
  // const guild = await Guild.find({current_fight: creature._id});

  // if(character.guilds.indexOf(guild._id) === -1) return res.status(401).send("Access denied");

  res.send(creature);
})

router.put('/:id/task_to_dmg', /*[authorization,*/ [validateObjectId], async (req, res) => {
  const Creature = res.locals.models.creature;
  const Task = res.locals.models.task;

  const { error } = validateCreature(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const creature = await Creature.findById(req.params.id);
  if(!creature) return res.status(404).send('The creature with given ID was not found')

  const task = await Task.findById(req.body.task_to_dmg);
  if(!task) return res.status(404).send('The task with given ID was not found');

  let creature = await Creature.findById(req.params.id);
  if(!creature) return res.status(404).send('The creature with given ID was not found');

    // Not tested
  // const user = await User.findById(req.user.id);
  // const character = await Character.findById(user.character_id);
  // const guild = await Guild.find({current_fight: creature._id});

  // if(guild.leader !== character._id) return res.status(401).send("Access denied");

  creature = await Creature.findByIdAndUpdate(req.params.id, {task_to_dmg: req.body.task_to_dmg}, {new: true});

  res.send(creature);
})

router.put('/:id/duration', /*[authorization,*/ [validateObjectId], async (req, res) => {
  const Creature = res.locals.models.creature;

  const { error } = validateCreature(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let creature = await Creature.findById(req.params.id);
  if(!creature) return res.status(404).send('The creature with given ID was not found');

    // Not tested
  // const user = await User.findById(req.user.id);
  // const character = await Character.findById(user.character_id);
  // const guild = await Guild.find({current_fight: creature._id});

  // if(guild.leader !== character._id) return res.status(401).send("Access denied");

  creature = await Creature.findByIdAndUpdate(req.params.id, {duration: req.body.duration}, {new: true});

  res.send(creature);
})

module.exports = router;