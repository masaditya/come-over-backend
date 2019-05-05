const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    eventTicket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userTicket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryTicket: String,
    priceTicket: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Ticket', ticketSchema);