const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const mongoose = require('mongoose');
const cekAuth = require('../middleware/auth');
const Menu = require('../models/menu');


router.get('/', (req, res) => {
    Menu.find().exec().then(events => {
        res.status(200).json(events)
    }).catch(err => {
        res.json(err)
    })
})


router.post("/", async (req, res) => {
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        menu: req.body.menu,
        price: req.body.price
    })

    await menu.save().then(result => {
        res.status(200).json({
            id: menu._id,
            data: menu
        })
    }).catch(err => {
        res.json(err)
    });
})

// update method
router.patch('/:menuId', async (req, res) => {

    const id = req.params.menuId;

    Menu.update({
        _id: id
    }, {
        $set: {
            nameEvent: req.body.name,
            locationEvent: req.body.location,
            timeEvent: req.body.time,
            posterEvent: req.body.poster,
            descEvent: req.body.desc,
            organizerEvent: req.body.organizer,
            categoryEvent: req.body.category
        }
    }).exec().then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
});

// delete method
router.delete('/:eventId', cekAuth, (req, res) => {
    const id = req.params.eventId;
    Event.remove({
        _id: id
    }).exec().then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
});


module.exports = router;