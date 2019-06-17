const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    menu: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },

}, {
    versionKey: false
})

module.exports = mongoose.model('Menu', menuSchema);