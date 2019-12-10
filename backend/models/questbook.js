const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const questbookSchema = new mongoose.Schema({
  tasks: {
    type: [ObjectId],
    ref: 'Task',
    done: { Type: Boolean, default: false },
    default: [],
  },
});

const Questbook = mongoose.model('Questbook', questbookSchema);

function validateQuestbook(questbook) {
  const schema = Joi.object({
    tasks: Joi.array().items(Joi.objectId),
  });

  return schema.validate(questbook);
}

exports.Questbook = Questbook;
exports.validateQuestbook = validateQuestbook;
