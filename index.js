const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const home = require('./backend/routes/home');
const express = require('express');
const app = express();

//-----------------------------------------------------------
const {User, validate} = require('./models/user'); 
const mongoose = require('mongoose');
//-----------------------------------------------------------

require('./startup/prod')(app);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);

if(app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

//----------------------------------------------

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conneted'))
    .catch(err => console.log("Error"))


app.post('/user', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(req.body);
    console.log(user);
    await user.save();

    res.send(req.body);
  });

  //------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));