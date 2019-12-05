const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const characterSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    guild_id: {
        type: ObjectId,
        ref: 'Guild'
    },
    inventory_id: {
        type: ObjectId,
        ref: 'Inventory'
    },
    questbook_id: {
        type: ObjectId,
        ref: 'Questbook'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    level: {
        type: Number,
        default: 1
    },
    class: {
        enum: ["warrior", "wizzard"]
    },
    exp_points: {
        type: Number,
        default: 0
    },
    hit_points: {
        type: Number,
        default: 0
    },
    physical_power: {
        type: Number,
        default: 0
    },
    magical_power: {
        type: Number,
        default: 0,
        required: true
    },

});

function validateCharacter(character) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        guild_id: Joi.objectId(),
        questbook_id: Joi.objectId().required(),
        inventory_id: Joi.number().min(0).required(),
        level: Joi.number().min(0).required(),
        class: Joi.enum(),
        exp_points: Joi.number().min(0).required(),
        hit_points: Joi.number().min(0).required(),
        physical_power: Joi.number().min(0).required(),
        magical_power: Joi.number().min(0).required(),

    });

    return schema.validate(character);
}

const Character = mongoose.model('Character', characterSchema);

exports.Character = Character;
exports.validateCharacter = validateCharacter;