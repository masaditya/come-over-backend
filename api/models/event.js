const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameEvent: String,
    locationEvent: String,
    timeEvent: String,
    posterEvent: String,
    descEvent: String,
    organizerEvent: String,
    categoryEvent: String
})

module.exports = mongoose.model('Event', eventSchema);