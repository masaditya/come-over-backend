const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ticket = require('../models/ticket');
const Event = require('../models/event');
const User = require('../models/user');
const cekAuth = require('../middleware/auth');
const jwt = require('jsonwebtoken');


// get method
router.get('/', cekAuth, (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
        return res.status(401).send("Auth request")
    }
    let payload = jwt.verify(token, "secret");
    if (!payload) {
        return res.status(401).send("Auth request")
    }
    req.userId = payload.subject;
    console.log(payload.subject)

    Ticket.find({
        userTicket: payload.subject
    }).populate('eventTicket userTicket', 'nameEvent locationEvent posterEvent timeEvent organizerEvent email').exec().then(ticket => {



        // console.log(ticket.eventTicket.populate("organizerEvent", "organizer"));
        res.status(200).json(ticket)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:ticketId', cekAuth, (req, res) => {
    const id = req.params.ticketId;
    Ticket.findById(id).populate('eventTicket userTicket', 'nameEvent locationEvent posterEvent email password').exec().then(ticket => {
        User.findById(ticket.userTicket._id).exec().then(result => console.log(result))
        if (!ticket) {
            res.json("Not Found")
        } else {
            res.json(ticket)
        }
    }).catch(err => {
        res.json(err)
    })
})

router.get('/event/:eventId', cekAuth, async (req, res) => {
    const id = req.params.eventId;
    await Ticket.find({
        eventTicket: id
    }).populate("userTicket", "name email phone").exec().then(ticket => {
        res.json(ticket)
    }).catch(err => {
        res.json(err)
    })
})


// post method 
router.post("/", cekAuth, (req, res) => {
    Event.findById(req.body.eventTicket).then(
        event => {
            console.log(event);

            if (!event) {
                return res.json("Not found")
            }

            const ticket = new Ticket({
                _id: new mongoose.Types.ObjectId(),
                eventTicket: event._id,
                userTicket: req.body.userTicket,
                categoryTicket: req.body.category,
                priceTicket: req.body.price
            });

            console.log(ticket);
            return ticket.save()

        }
    ).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })


})

// delete method
router.delete('/:ticketId', cekAuth, (req, res) => {
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