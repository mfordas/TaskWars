const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const guildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  leader: {
    type: ObjectId,
    ref: 'Character',
  },
  members: {
    type: [ObjectId],
    ref: 'Character',
    default: [],
  },
  type: {
    type: String,
    enum: ['', 'Physical', 'Mental', 'Utility'],
    default: '',
  },
  current_fight: {
    type: Object,
    ref: 'Creature',
    default: null,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: 1024,
  },
  flag: {
    type: String,
    default: 'https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png',
  },
});

function validateGuild(guild) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    leader: Joi.objectId(),
    members: Joi.array().items(Joi.objectId()),
    type: Joi.valid('Physical', 'Mental', 'Utility'),
    current_fight: Joi.object(),
    description: Joi.string().max(1024),
    flag: Joi.string(),
  });

  return schema.validate(guild);
}

exports.guild = guildSchema;
exports.validateGuild = validateGuild;
