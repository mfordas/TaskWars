const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const inventorySchema = new mongoose.Schema({
    backpack: {
      type: [ObjectId],
      ref: "Item",
      equipped: { Type: Boolean, default: false },
      default: []
    },
    gold: {
      type: Number,
      default: 0,
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

function validateInventory(inventory) {
    const schema = Joi.object({
      backpack: Joi.array().items(Joi.objectId),
      gold: Joi.number().min(0)
    });
  
    return schema.validate(inventory);
  }
  
  exports.Inventory = Inventory; 
  exports.validateInventory = validateInventory;