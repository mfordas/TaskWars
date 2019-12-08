const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const home = require('./backend/routes/home');
const express = require('express');
const app = express();

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

const authorization = require('./backend/middleware/authorization');
const validateObjectId = require('./backend/middleware/validateObjectId');

//-----------------------------------------------------------

app.set('view engine', 'pug');
app.set('views', './views');
mongoose.set('useFindAndModify', false);


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);

if (app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

//--------------------------------------------------

mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Conneted'))
    .catch(err => console.log("Error"))

    app.post('/users', async (req, res) => {
    console.log(validateUser);
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(req.body);
    console.log(user);
    await user.save();

    res.send(req.body);
  });

app.post('/characters', async (req, res) => {
    const { error } = validateCharacter(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let character = new Character(req.body);
    console.log(character);
    await character.save();

    res.send(req.body);
});

app.post('/inventories', async (req, res) => {
    const { error } = validateInventory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let inventory = new Inventory(req.body);
    console.log(inventory);
    await inventory.save();

    res.send(inventory);
  });

  app.post('/items', async (req, res) => {
    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = await Item.findOne({ name: req.body.name });
    if (item) return res.status(400).send('Item already exists.');

    item = new Item(req.body);
    console.log(item);
    await item.save();

    res.send(item);
  });

  app.post('/questbooks', async (req, res) => {
    const { error } = validateQuestbook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let questbook = new Questbook(req.body);
    console.log(questbook);
    await questbook.save();

    res.send(questbook);
  });

  app.post('/creatures', async (req, res) => {
    const { error } = validateCreature(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let creature = new Creature(req.body);
    console.log(creature);
    await creature.save();

    res.send(creature);
  });

  app.post('/guilds', async (req, res) => {
    const { error } = validateGuild(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let guild = new Guild(req.body);
    console.log(guild);
    await guild.save();

    res.send(guild);
  });

  app.post('/tasks', async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task(req.body);
    console.log(task);
    await task.save();

    res.send(task);
  });

  app.get('/creatures', /*authorization,*/ async (req, res) => {
    const creatures = await Creature.find().sort({'level' : 1 , 'name' : 1 })
    res.send(creatures);
  })

  app.get('/creatures/:id', /*[authorization,*/ [validateObjectId], async (req, res) => {
    const creature = await Creature.findById(req.params.id);
    if(!creature) return res.status(404).send('The creature with given ID was not found')

    // Not tested
    // const user = User.findById(req.user.id);
    // const character = Character.findById(user.character_id);
    // const guild = Guild.find({current_fight: creature._id});

    // if(character.guilds.indexOf(guild._id) === -1) return res.status(401).send("Access denied");

    res.send(creature);
  })

  app.put('/creatures/:id/:task_id', /*[authorization,*/ [validateObjectId], async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.task_id)) return res.status(404).send('Invalid Task.');
    
    // Not tested
    // const user = User.findById(req.user.id);
    // const character = Character.findById(user.character_id);
    // const guild = Guild.find({current_fight: creature._id});

    // if(guild.leader !== character._id) return res.status(401).send("Access denied");

    const { error } = validateCreature(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findById(req.params.task_id);
    if(!task) return res.status(404).send('The task with given ID was not found');

    const creature = await Creature.findByIdAndUpdate(req.params.id, {task_to_dmg: req.params.task_id}, {new: true});
    if(!creature) return res.status(404).send('The creature with given ID was not found');

    res.send(creature);
  })


 
  //------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));