const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const inventorySchema = new mongoose.Schema({
    items: {
      type: [ObjectId],
      ref: "Items",
      def: []
    },
    gold: {
      type: Number,
      default: 0,
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

function validateInventory(inventory) {
    const schema = Joi.object({
      items: Joi.array().items(Joi.objectId),
      gold: Joi.number().min(0)
    });
  
    return schema.validate(inventory);
  }
  
  exports.Inventory = Inventory; 
  exports.validateInventory = validateInventory;