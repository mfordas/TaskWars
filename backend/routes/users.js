const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {
  validateUser
} = require('../models/user');
const {sednEmail} = require('./email');
const mongoose = require('mongoose');
const auth = require('../middleware/authorization');
const admin = require('../middleware/admin');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const User = res.locals.models.user;
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  // // send email -----------------
  const url = `http://127.0.0.1:8080/api/users/confirmation/${token}`;
  sednEmail(req.body.email, url);

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/confirmation/:token', async (req, res) => {
  const User = res.locals.models.user;

  let user = await jwt.verify(req.params.token, process.env.JWTPRIVATEKEY);
  user = await User.findByIdAndUpdate(user._id, {
    isVerified: true
  }, {
    new: true
  });

  res.redirect('http://localhost:3000/confirmed');
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

  res.send(_.pick(user, ['_id', 'name', 'email', 'character_id']));
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
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.user._id, {
      password: newPassword
    }, {
      new: true,
    },
  );
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.put('/:id/password', [auth, admin], async (req, res) => {
  const User = res.locals.models.user;
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findByIdAndUpdate(req.params.id, {
      password: newPassword
    }, {
      new: true
    });
  }

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.put('/:id/character_id', (req, res) => {
  const User = res.locals.models.user;
  getUsers(User, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`User with this id: ${req.params.id} not found`);
    } else {
      User.findByIdAndUpdate(
        req.params.id,
        {
          character_id: req.body.character_id,
        },
        { new: true },
      ).then(
        r => {
          res.send('CharID updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

async function getUsers(User, id) {
  if (id) {
    return await User.find({ _id: id }).then(
      result => {
        return result[0];
      },
      err => console.log('Error', err),
    );
  } else {
    return await User.find().then(
      result => {
        return result;
      },
      err => console.log('Error', err),
    );
  }
}

module.exports = router;