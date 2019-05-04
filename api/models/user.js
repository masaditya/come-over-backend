const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    phone: String,
    address: String

})

module.exports = mongoose.model('User', userSchema);