const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/:id/completed', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id).populate('tasks');

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  
  const tasks =  _.filter(questbook.tasks, task => {
      return task.status == 'completed';
  });
  
  res.send(tasks);
});

router.get('/:id/uncompleted', async (req, res) => {
    const Questbook = res.locals.models.questbook;
    const questbook = await Questbook.findById(req.params.id).populate('tasks');

    if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
    
    const tasks =  _.filter(questbook.tasks, task => {
        return task.status == 'in_progress';
    });
    
    res.send(tasks);
  });


router.get('/:id/failed', async (req, res) => {
    const Questbook = res.locals.models.questbook;
    const questbook = await Questbook.findById(req.params.id).populate('tasks');

    if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
    
    const tasks =  _.filter(questbook.tasks, task => {
        return task.status == 'failed';
    });
    
    res.send(tasks);
  });

  router.put('/:id/task', async (req, res) => {
    const Questbook = res.locals.models.questbook;
    const Task = res.locals.models.task;
    const task = await Task.findById(req.body._id);
    if(!task) return res.status(400).send('Invalid task.');

    const questbookHandel = await Questbook.findById(req.params.id, 'tasks', { lean: true });
    questbookHandel.tasks.push(req.body._id);

    const questbook = await Questbook.findByIdAndUpdate(req.params.id,
        {
            tasks: questbookHandel.tasks
        }, { new: true });

    if(!questbook) return res.status(404).send('The questbook with the given ID was not found.');
    res.send(questbook);
});
module.exports = router;
