const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/:id/completed', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id).populate('tasks');

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  
  const tasks =  _.filter(questbook.tasks, task => {
      return task.done == 'true';
  });
  
  res.send(tasks);
});

router.get('/:id/uncompleted', async (req, res) => {
    const Questbook = res.locals.models.questbook;
    const questbook = await Questbook.findById(req.params.id).populate('tasks');

    if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
    
    const tasks =  _.filter(questbook.tasks, task => {
        return task.done != 'true';
    });
    
    res.send(tasks);
  });

module.exports = router;
