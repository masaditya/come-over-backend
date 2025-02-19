const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Menu', menuSchema);