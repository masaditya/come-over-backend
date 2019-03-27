const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const mongoose = require('mongoose');


// get method
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'handling get event'
    })
})

router.get('/:eventId', (req, res) => {
    const id = req.params.eventId;
    res.status(200).json({
        message: "handling event with id : " + id

    })
})


// post method 
router.post("/", (req, res) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        nameEvent: req.body.name,
        locationEvent: req.body.location,
        timeEvent: req.body.time,
        posterEvent: req.body.poster,
        descEvent: req.body.desc,
        organizerEvent: req.body.organizer,
        categoryEvent: req.body.category
    })

    event.save().then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    });


    res.status(200).json(event)
})

// update method
router.patch('/:eventId', (req, res) => {
    const id = req.params.eventId;
    res.status(200).json({
        message: "handling update event with id : " + id

    })
});

// delete method
router.delete('/:eventId', (req, res) => {
    const id = req.params.eventId;
    res.status(200).json({
        message: "delete event with id : " + id
    });
});

module.exports = router;