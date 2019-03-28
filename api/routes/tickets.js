const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Event = require('../models/event');
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
    Event.findById(req.body.event).then(event => {

        if (!event) {
            return res.json({
                "message": "event not found"
            })
        }
        const ticket = new Ticket({
            _id: new mongoose.Types.ObjectId(),
            userTicket: req.body.user,
            eventTicket: req.body.event,
            categoryTicket: req.body.category,
            priceTicket: req.body.price
        });


        return ticket.save()

    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })

})

// update method
router.patch('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    Ticket.update({
        _id: id
    }, {
        $set: {
            nameEvent: req.body.name,
            userTicket: req.body.user,
            eventTicket: req.body.event,
            categoryTicket: req.body.category,
            priceTicket: req.body.price
        }
    }).exec().then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
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