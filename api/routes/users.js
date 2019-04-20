const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({
        email: req.body.email
    }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "email exist"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(result => {
                        res.json(result)
                    }).catch(err => {
                        res.json(err)
                    })
                }
            })
        }
    })

})

// delete user 
router.delete('/:userId', (req, res) => {
    User.remove({
        _id: req.params.userId
    }).exec().then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router;