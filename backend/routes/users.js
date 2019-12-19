const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { validateUser } = require('../models/user');
const mongoose = require('mongoose');
const auth = require('../middleware/authorization');
const admin = require('../middleware/admin');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
require('dotenv').config();

// --------- Mail settings----------------------
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // TODO: your gmail account
    pass: process.env.PASSWORD
  }
});
// ------ end mail settings---------------------

router.post('/', async (req, res) => {
  const User = res.locals.models.user;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  // send email -----------------
  const url = `http://127.0.0.1:8080/api/users/confirmation/${user._id}`;
  let mailOptions = {
    from: 'task.wars12@gmail.com',
    to: req.body.email,
    sbuject: 'Confirm Email',
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error Occurs: ', err);
    } else {
      console.log('Email sent!!!');
    }
  });
  // ---------------------------

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/confirmation/:id', async (req, res) => {
  const User = res.locals.models.user;
  let user = await User.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
  res.write("Hello User! Your account has been verified.");
  res.end();
});

router.get('/', async (req, res) => {
  const User = res.locals.models.user;
  const users = await User.find()
    .select('_id email')
    .sort('email');

  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  const User = res.locals.models.user;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email', 'character_id']));
});

router.get('/:id', async (req, res) => {
  const User = res.locals.models.user;
  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findById(req.params.id);
  }

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});


router.put('/me/password', auth, async (req, res) => {
  const User = res.locals.models.user;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { password: newPassword },
    {
      new: true,
    },
  );
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.put('/:id/password', [auth, admin], async (req, res) => {
  const User = res.locals.models.user;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findByIdAndUpdate(req.params.id, { password: newPassword }, { new: true });
  }

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

module.exports = router;

// "name": "Task Wars"
