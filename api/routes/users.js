const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    let userData = req.body;
    let user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: userData.email,
        password: userData.password
    });
    console.log(user);
    user.save().then(result => {
        let payload = {
            subject: result._id
        };
        let token = jwt.sign(payload, "secret");
        console.log(token);
        res.send({
            token
        });
    }).catch(err => {
        console.log(err)
        res.json({ "message": "goblok" })
    })
})


router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
        email: userData.email
    }).exec().then(result => {
        if (!result) {
            console.log("error email")
            res.json({ "msg": "invalid email" });
        } else {
            if (result.password !== userData.password) {
                res.json({ "msg ": "invalid password" })
            } else {
                let payload = {
                    subject: result._id
                };
                let token = jwt.sign(payload, "secret");
                res.send({ token });
            }
        }
    }).catch(err => {
        console.log(err)
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