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
    default: '',
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
    current_fight: Joi.objectId(),
    description: Joi.string().max(1024),
    flag: Joi.string(),
  });

  return schema.validate(guild);
}

exports.guild = guildSchema;
exports.validateGuild = validateGuild;
