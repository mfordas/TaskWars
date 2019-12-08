require('dotenv').config({ path: '.env' });
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const home = require('./backend/routes/home');
const mongoose = require('mongoose');
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

const mongodbURI = process.env.MONGODB_URI;
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('Connect to MongoDB...'))
.catch((error) => console.log('Cannot connect with database.',error));

if(app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));