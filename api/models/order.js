const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer: {
        type: String,
        required: true
    },
    menus: [{
        menu: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Order', orderSchema);
