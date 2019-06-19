const mongoose = require('mongoose');

const tempSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true,
    },
    menu: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },

}, {
    versionKey: false
})

module.exports = mongoose.model('Temp', tempSchema);