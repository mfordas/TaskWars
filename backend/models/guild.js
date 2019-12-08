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
        maxlength: 255
    },
    leader: {
        type: ObjectId,
        ref: 'Character',
        default: null
    },
    members: {
        type: [ObjectId],
        ref: 'Character',
        default: []
    },
    type: {
        type: String,
        enum: ["", "Physical", "Mental", "Utility"],
        default: ""
    },
    current_fight: {
        type: ObjectId,
        ref: 'Creature',
        default: null
    },
});

function validateGuild(guild) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        leader: Joi.objectId(),
        members: Joi.array().items(Joi.objectId()),
        type: Joi.valid("Physical", "Mental", "Utility"),
        current_fight: Joi.objectId()
    });

    return schema.validate(guild);
}

const Guild = mongoose.model('Guild', guildSchema);

exports.Guild = Guild;
exports.validateGuild = validateGuild;