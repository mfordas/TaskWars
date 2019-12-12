const {item, validateItem} = require('../models/item');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('items', item);

router.get('/', async (req, res) => {
    const items = await Item.find().sort('slot');
    res.send(items);
});

router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if(!item) return res.status(404).send('The item with the given ID was not found.');
    res.send(item);
});

module.exports = router;