const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userTicket: String,
    eventTicket: String,
    categoryTicket: String,
    priceTicket: Number
})

module.exports = mongoose.model('Ticket', ticketSchema);