const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const home = require('./routes/home');
const users = require('./routes/users');
const express = require('express');
const path = require('path');
const db = require('./db');

const main = async () => {
  const app = express();

  // if (app.get('env') == 'development') {
  //   app.use(morgan('tiny'));
  //   debug('Morgan enabled...');
  // }

  // // Database configuration
  // const connection = await db.connect();
  // const models = db.load(connection);
  // if (process.env.TEST_ENV || process.env.NODE_ENV) {
  //   await connection.dropDatabase();
  //   await db.initialize(models);
  // }

  // db.register(app, connection, models);

  mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  //Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(helmet());

  //Routes
  app.use('/', home);
  app.use('/api/users', users);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));

  // //Listening
  // const host = process.env.HOST || '127.0.0.1';
  // const port = process.env.PORT || 8080;
  // app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
};

main();
