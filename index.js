const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const home = require('./backend/routes/home');
const users = require('./backend/routes/users');
const express = require('express');
const app = express();

require('./backend/startup/prod')(app);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/users',users);

if(app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));