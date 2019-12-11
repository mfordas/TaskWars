const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const home = require('./routes/home');
const creatures = require('./routes/creatures');
const item = require('./routes/item');
const inventory = require('./routes/inventory');
const express = require('express');
const path = require('path');
const db = require('./db');

const main = async () => {
  const app = express();

  if (app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
  }

  // Database configuration
  const connection = await db.connect();
  const models = db.load(connection);
  if (process.env.TEST_ENV || process.env.NODE_ENV) {
    await connection.dropDatabase();
    await db.initialize(models);
  }

  db.register(app, connection, models);
 

  //Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(helmet());

  //Routes
  app.use('/', home);
  app.use('/api/creatures', creatures);
  app.use('/item', item);
  app.use('/inventory', inventory);

  //Listening
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
};

main();
