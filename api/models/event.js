const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameEvent: {
        type: String,
        required: true
    },
    locationEvent: {
        type: String,
        required: true
    },
    timeEvent: {
        type: String,
        required: true
    },
    posterEvent: {
        type: String,
        required: true
    },
    descEvent: {
        type: String,
        required: true
    },
    organizerEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryEvent: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema);