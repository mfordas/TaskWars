const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const {Task, validateTask} = require('../models/task');

//add new task
router.post('/tasks', async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task(req.body);
    console.log(task);
    await task.save();

    res.send(task);
  });

//get all tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find().sort('name');
    res.send(tasks);
  });


//get task by id  
router.get('/tasks/:id', (req, res) => {
    getTasks(Task, req.params.id).then(result => {
      if (!result) {
        res.status(404).send(`Task with this id: ${req.params.id} not found`);
      } else {
        res.send(result);
      }
    });
  });

  //change task duration

  router.put('/tasks/:id/duration', (req, res) => {
    
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


  module.exports = router;