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
//-----------------------------------------------------------

app.set('view engine', 'pug');
app.set('views', './views');

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

mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
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

    character = new Character(req.body);
    console.log(character);
    await character.save();

    res.send(req.body);
});

app.post('/inventories', async (req, res) => {
    const { error } = validateInventory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    inventory = new Inventory(req.body);
    console.log(inventory);
    await inventory.save();

    res.send(inventory);
  });

  //------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));