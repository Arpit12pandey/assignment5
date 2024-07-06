const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create
router.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read All
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read One
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update
router.patch('/items/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'quantity', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).send();
        }

        updates.forEach(update => item[update] = req.body[update]);
        await item.save();
        res.send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete
router.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).send();
        }

        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
