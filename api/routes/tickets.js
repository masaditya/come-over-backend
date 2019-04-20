const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ticket = require('../models/ticket');
const Event = require('../models/event');


// get method
router.get('/', (req, res) => {
    Ticket.find().populate('eventTicket', 'nameEvent locationEvent posterEvent  ').exec().then(ticket => {
        res.status(200).json(ticket)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    Ticket.findById(id).exec().then(ticket => {
        if (!ticket) {
            res.json("Not Found")
        } else {
            res.json(ticket)
        }
    }).catch(err => {
        res.json(err)
    })
})


// post method 
router.post("/", (req, res) => {
    Event.findById(req.body.eventTicket).then(
        event => {

            if (!event) {
                return res.json("Not found")
            }

            const ticket = new Ticket({
                _id: new mongoose.Types.ObjectId(),
                eventTicket: req.body.event,
                categoryTicket: req.body.category,
                priceTicket: req.body.price
            });


            return ticket.save()

        }
    ).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })


})

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