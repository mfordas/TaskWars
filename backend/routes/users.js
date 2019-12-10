const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
<<<<<<< HEAD
const {User, validate} = require('../models/user');
=======
const { User, validate } = require('../models/user');
>>>>>>> master
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
<<<<<<< HEAD
  const { error } = validate(req.body); 
=======
  const { error } = validate(req.body);
>>>>>>> master
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

<<<<<<< HEAD
  user = new User({
    email: req.body.email,
    password: req.body.password
  });

  await user.save();

  res.send(user);
});

module.exports = router; 
=======
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
>>>>>>> master
