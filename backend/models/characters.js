const Joi = require('joi');
const {
    Schema
} = require('mongoose');
const ObjectId = Schema.Types.ObjectId;


const Character = new Schema({
    _id: {
        type: Number
    },
    guild_id: {
        type: ObjectId,
        ref: 'Guild'
    },
    inventory_id: {
        type: Number
    },
    questbook_id: {
        type: ObjectId,
        ref: 'Questbook'
    },
    name: {
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    level: {
        type: Number
    },
    class: {
        enum: [warrior, wizzard]
    },
    exp_points: {
        type: Number
    },
    hit_points: {
        type: Number
    },
    physical_power: {
        type: Number
    },
    magical_power: {
        type: Number
    },

});

function validateCharacter(character) {
    const schema = {
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

    };

    return Joi.validate(character, schema);
}

exports.Character = Character;
exports.validate = validateCharacter;