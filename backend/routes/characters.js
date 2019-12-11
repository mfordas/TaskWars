const express = require('express');
const router = express.Router();
const {Character, validateCharacter} = require('../models/character');


router.post('/', async (req, res) => {
    const {error} = validateCharacter(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    character = new Character(req.body);
    console.log(character);
    await character.save();
    res.send(character);
});


router.get('/:id', async (req, res) => {
    const character = await Character.findById(req.params.id);
    if(!character) res.status(404).send(`Character with id ${req.params.id} not found`); 
    res.send(character);
});

router.put('/:id/level', async (req, res) => {
    const { error } = validateCharacter(req.body.level);
    if (error) return res.status(400).send(error.details[0].message);
           
    const character = await Character.findByIdAndUpdate(req.params.id, {level: req.body.level}, {new: true});
    if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
    res.send(character);
});

router.put('/:id/health', async (req, res) => {
    const { error } = validateCharacter(req.body.health);
    if (error) return res.status(400).send(error.details[0].message);
           
    const character = await Character.findByIdAndUpdate(req.params.id, {health: req.body.health}, {new: true});
    if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
    res.send(character);
});

router.put('/:id/exp_points', async (req, res) => {
    const { error } = validateCharacter(req.body.exp_points);
    if (error) return res.status(400).send(error.details[0].message);
           
    const character = await Character.findByIdAndUpdate(req.params.id, {exp_points: req.body.exp_points}, {new: true});
    if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
    res.send(character);
});

router.put('/:id/physical_power', async (req, res) => {
    const { error } = validateCharacter(req.body.physical_power);
    if (error) return res.status(400).send(error.details[0].message);
           
    const character = await Character.findByIdAndUpdate(req.params.id, {physical_power: req.body.physical_power}, {new: true});
    if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
    res.send(character);
});

router.put('/:id/magical_power', async (req, res) => {
    const { error } = validateCharacter(req.body.magical_power);
    if (error) return res.status(400).send(error.details[0].message);
           
    const character = await Character.findByIdAndUpdate(req.params.id, {magical_power: req.body.magical_power}, {new: true});
    if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
    res.send(character);
});

module.exports = router;