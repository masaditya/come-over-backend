const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const mongoose = require('mongoose');


// get method
router.get('/', (req, res) => {
    Ticket.find().exec().then(ticket => {
        res.json(ticket)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:ticketId', (req, res) => {

    const id = req.params.ticketId;
    Ticket.findById(id).exec().then(ticket => {
        res.json(ticket)
    }).catch(err => {
        res.json(err)
    })
})


// post method 
router.post("/", (req, res) => {
    const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        userTicket: req.body.user,
        eventTicket: req.body.event,
        categoryTicket: req.body.category,
        priceTicket: req.body.price
    })

    ticket.save().then(result => {
        console.log(result)
        res.status(200).json(ticket)
    }).catch(err => {
        console.log(err)
        res.json(err)
    });


})

// update method
router.patch('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    res.status(200).json({
        message: "handling update event with id : " + id

    })
});

// delete method
router.delete('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    Ticket.remove({
        _id: id
    }).exec().then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
});

module.exports = router;