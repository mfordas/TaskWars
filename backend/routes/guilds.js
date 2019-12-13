const {guild, validateGuild} = require('../models/guild');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const Guild = res.locals.models.guild;
    const guild = await Guild.find();
    res.send(guild);
});

router.get('/:id',  async (req, res) => {
    const Guild = res.locals.models.guild;
    const guild = await Guild.findById(req.params.id);
    if(!guild) res.status(404).send(`Guild with id ${req.params.id} not found`); 
    res.send(guild);
});

router.post('/', async (req, res) => {
    const Guild = res.locals.models.guild;
    const {error} = validateGuild(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let guild = await Guild.findOne({name: req.body.name});
    if (guild) return res.status(400).send('Guild with this name already existed.');

    guild = new Guild({
        name: req.body.name
    });

    await guild.save();
    res.send(guild);
});

router.put('/:id', async (req, res) => {
    const Guild = res.locals.models.guild;
    const { error } = validateGuild(req.body.current_fight);
    if (error) return res.status(400).send(error.details[0].message);
           
    const guild = await Guild.findByIdAndUpdate(req.params.id);
    if(!guild) return res.status(404).send(`Guild with id ${req.params.id} not found`);
    
    guild.current_fight = req.body.current_fight;

    res.send(guild);
});

module.exports = router;