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
        password: userData.password,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        organizer: userData.organizer
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
        res.json({
            "message": "goblok"
        })
    })
})


router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
        email: userData.email
    }).exec().then(result => {
        if (!result) {
            console.log("error email")
            res.json({
                "msg": "invalid email"
            });
        } else {
            if (result.password !== userData.password) {
                res.json({
                    "msg ": "invalid password"
                })
            } else {
                let payload = {
                    subject: result._id
                };
                let token = jwt.sign(payload, "secret");
                res.send({
                    token
                });
            }
        }
    }).catch(err => {
        console.log(err)
    })
})



router.get('/payload/', (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Auth request")
    }
    // let token = req.params.token.split(" ")[1];
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
        return res.status(401).send("Auth request")
    }
    let payload = jwt.verify(token, "secret");
    if (!payload) {
        return res.status(401).send("Auth request")
    }
    req.userId = payload.subject;
    res.json(payload);
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


router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    await User.findById(req.params.id).exec().then(result => {
        console.log(result)
        res.json(result)
    }).catch(err => {
        res.json(err)
    });
});

router.get('/', (req, res) => {
    User.find().exec().then(result => {
        res.json(result)
    }).catch(err => {
        res.json(result)
    });
});
module.exports = router;