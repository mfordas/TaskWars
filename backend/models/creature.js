const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  level: {
    type: Number,
    default: 1,
  },
  health: {
    type: Number,
    default: 0,
  },

  physical_power: {
    type: Number,
    default: 0,
  },
  physical_resistence: {
    type: Number,
    default: 0,
  },
  magical_power: {
    type: Number,
    default: 0,
  },
  magical_resistence: {
    type: Number,
    default: 0,
  },
  reward: {
    type: Number,
    default: 0,
  },
  task_to_dmg: {
    type: Number,
    default: 0,
  },
});

function validateCreature(creature) {
  const schema = Joi.object({
    _id: Joi.number().min(0),
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    level: Joi.number().min(0),
    health: Joi.number().min(0),
    physical_power: Joi.number().min(0),
    physical_resistence: Joi.number().min(0),
    physical_power: Joi.number().min(0),
    magical_power: Joi.number().min(0),
    magical_resistence: Joi.number().min(0),
    reward: Joi.number().min(0),
    task_to_dmg: Joi.number().min(0),
  });

  return schema.validate(creature);
}

const Creature = mongoose.model('Creature', creatureSchema);

exports.Creature = Creature;
exports.validateCreature = validateCreature;
