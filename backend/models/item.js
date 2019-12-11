const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  slot: {
    type: String,
    enum: ['', 'Weapon', 'Head', 'Body', 'Boots', 'Usable'],
    require: true,
  },
  description: {
    type: String,
    default: '',
    maxlength: 300,
  },
  effect: {
    type: String,
    default: '',
  },
  effect_value: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  equipped: { Type: Boolean, default: false }
});

// const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    slot: Joi.valid('Weapon', 'Head', 'Body', 'Boots', 'Usable').required(),
    description: Joi.string().max(300),
    effect: Joi.string(),
    effect_value: Joi.number(),
    price: Joi.number(),
    equipped: Joi.boolean()
  });

  return schema.validate(item);
}

// exports.Item = Item;
exports.item = itemSchema;
exports.validateItem = validateItem;
