const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const {Task, validateTask} = require('../models/task');
// const {User, validateUser} = require('../models/user');
// const {Character, validateCharacter} = require('../models/character');
// const {Questbook, validateQuestbook} = require('../models/questbook');
// const authorization = require('../middleware/authorization');

router.put('/:id/status', /*[authorization,*/ [validateObjectId], async (req, res) => {

    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = await Task.findById(req.params.id);
    if(!task) return res.status(404).send('The task with given ID was not found');

      // Not tested
    // const user = await User.findById(req.user.id);
    // const character = await Character.findById(user.character_id);
    // const questbook = await Questbook.find({character.questbook_id});

    // if(questbook.tasks.indexOf(req.param.id) === -1) return res.status(401).send("Access denied");

    task = await Task.findByIdAndUpdate(req.params.id, {done: req.body.done}, {new: true});

    res.send(task);
  })

  module.exports = router;