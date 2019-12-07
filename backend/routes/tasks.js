const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

require('./backend/startup/prod')(app);
//-----------------------------------------------------------
const mongoose = require('mongoose');
const {User, validateUser} = require('./backend/models/user');
const {Character, validateCharacter} = require('./backend/models/character');
const {Inventory, validateInventory} = require('./backend/models/inventory');
const {Item, validateItem} = require('./backend/models/item');
const {Questbook, validateQuestbook} = require('./backend/models/questbook');
const {Creature, validateCreature} = require('./backend/models/creature');
const {Guild, validateGuild} = require('./backend/models/guild');
const {Task, validateTask} = require('./backend/models/task');

//-----------------------------------------------------------


//add new task
app.post('/task', async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task(req.body);
    console.log(task);
    await task.save();

    res.send(task);
  });

//get all tasks
  app.get('/tasks', async (req, res) => {
    const tasks = await Task.find().sort('name');
    res.send(tasks);
  });


//get task by id  
app.get('/tasks/:id', (req, res) => {
    getTasks(Task, req.params.id).then(result => {
      if (!result) {
        res.status(404).send(`Task with this id: ${req.params.id} not found`);
      } else {
        res.send(result);
      }
    });
  });

  //change task duration

  app.put('/tasks/:id/duration', (req, res) => {
    
    getTasks(Task, req.params.id).then(result => {
      if (!result) {
        res.status(404).send(`Task with this id: ${req.params.id} not found`);
      } else {
        // console.log(result);
        Task.findByIdAndUpdate(req.params.id, {
          duration: req.body.duration
        }, { new: true }).then(
          r => {
            res.send(`Duration time updated for task: ${r.name}:\n${r}`);
          },
          err => {
            console.log(err.errmsg);
            res.status(403).send('Bad request!');
          },
        );
      }
    });
  });

  async function getTasks(Task, id) {
    if (id) {
      // return await Team
      return await Task.find({ _id: id })
        .then(
          result => {
            return result[0];
          },
          err => console.log('Something went wrong...', err),
        );
    } else {
      // return await Team
      return await Task.find()
        .then(
          result => {
            return result;
          },
          err => console.log('Something went wrong...', err),
        );
    }
  }