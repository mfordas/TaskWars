const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const auth = require('../middleware/authorization');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/', async (req, res) => {
  const users = await User.find().sort('_id');
  res.send(_.pick(users, ['_id', 'name', 'email']));
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id/password', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(req.params.id, { password: newPassword }, {
    new: true
  });
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/me/password', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(req.user._id, { password: newPassword }, {
    new: true
  });
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
