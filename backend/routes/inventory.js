const {inventory, validateInventory} = require('../models/inventory');
const {item, validateItem} = require('../models/item');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inventory = mongoose.model('inventories', inventory);
const Item = mongoose.model('items', item);

router.get('/:id', async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);
    if(!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

router.put('/:id/gold', async (req, res) => {
    const { error } = validateInventory(req.body.inventory);
    if(error) return res.status(400).send(error.details[0].message);

    const inventory = await Inventory.findByIdAndUpdate(req.params.id,
        {
            gold: req.body.inventory.gold
        }, { new: true });
    if(!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

router.put('/:id/backpack', async (req, res) => {
    const item = await Item.findById(req.body._id);
    if(!item) return res.status(400).send('Invalid item.');

    const inventoryHandel = await Inventory.findById(req.params.id, 'backpack', { lean: true });
    inventoryHandel.backpack.push(req.body._id);

    const inventory = await Inventory.findByIdAndUpdate(req.params.id,
        {
            backpack: inventoryHandel.backpack
        }, { new: true });

    if(!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

module.exports = router;