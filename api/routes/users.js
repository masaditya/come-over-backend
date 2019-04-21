const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


router.post('/login', (req, res) => {
    User.find({
        email: req.body.email
    }).exec().then(user => {
        if (user.length < 1) {
            return res.status(404).json({
                message: "auth fail"
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: "auth fail err"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.json({
                        message: "auth success",
                        token: token
                    });
                }
                return res.status(404).json({
                    message: "auth fail"
                });
            })
        }
    }).catch(err => {
        res.json(err)
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