const {Guild, validateGuild} = require('../models/guild');
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
    if (!guild) res.status(404).send(`Guild with id ${req.params.id} not found`);
    res.send(guild);

    // const guild = await Guild.findById(req.params.id);
    // if(!guild) res.status(404).send(`Guild with id ${req.params.id} not found`); 
    // res.send(guild);
});

router.post('/', async (req, res) => {
    const Guild = res.locals.models.guild;
    const { error } = validateGuild(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let guild = new Guild(req.body);
    await guild.save();
    res.send(guild);

    // const {error} = validateGuild(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    // let guild = await Guild.findOne({name: req.body.name});
    // if (guild) return res.status(400).send('Guild with this name already existed.');
    // guild = new Guild({
    //     name: req.body.name
    // });
    // await guild.save();
    // res.send(guild);
});

router.put('/:id/members', (req, res) => {
    const Guild = res.locals.models.guild;
    getGuilds(Guild, req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).send(`Guild with this id: ${req.params.id} not found`);
      } else { 
        Guild.findByIdAndUpdate(req.params.id, {
            memebers: req.body.memebers,
          },{ new: true })
          .then(r => {
            res.send("Members updated!");
          },
          err => {
            res.status(403).send("Bad request!");
          },
        );
      }
    });
  });

  router.put('/:id/current_fight', (req, res) => {
    const Guild = res.locals.models.guild;
    getGuilds(Guild, req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).send(`Guild with this id: ${req.params.id} not found`);
      } else { 
        Guild.findByIdAndUpdate(req.params.id,
          {
            current_fight: req.body.current_fight,
          },{ new: true })
          .then(r => {
            res.send("current_fight updated!");
          },
          err => {
            res.status(403).send("Bad request!");
          },
        );
      }
    });
  });

  async function getGuilds(Guild, id) {
    if (id) {
      return await Guild.find({ _id: id })
      .then(result => {
        return result[0];
      },
      err => console.log('Error', err)
      );
    } else {
      return await Guild.find()
      .then(result => {
        return result;
      },
      err => console.log('Error', err),
      );
    }
  }

  //   router.put('/:id/name', async (req, res) => {
//     const { error } = validateGuild(req.body.current_fight);
//     if (error) return res.status(400).send(error.details[0].message);
           
//     const guild = await Guild.findByIdAndUpdate(req.params.id);
//     if(!guild) return res.status(404).send(`Guild with id ${req.params.id} not found`);
    
//     guild.name = req.body.name;

//     res.send(guild);
// });

module.exports = router;