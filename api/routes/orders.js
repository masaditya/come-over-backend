const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu');
const Order = require('../models/order');


router.get('/', async (req, res) => {
    await Order.find().exec().then(menus => {
        res.status(200).json({
            size: menus.length,
            data: menus
        })
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:id', async (req, res) => {
    await Order.findById(req.params.id).exec().then(menus => {
        res.status(200).json(menus)
    }).catch(err => {
        res.json(err)
    })
})

// post new order
router.post("/", async (req, res) => {

    var order = new Order({
        _id: new mongoose.Types.ObjectId(),
        customer: req.body.customer,
        menus: [],
        total: 0
    })

    console.log(menus)
    res.json({
        id: order._id,
        data: order
    })
})

// add menu in order
router.post("/:id", async (req, res) => {
    console.log(req.params.id)
    await Menu.findById(req.params.id).exec().then(doc => {
        res.json(doc)
        console.log(doc)
    }).catch(err => {
        res.json(err)
    });
});


// update method
router.patch('/:id', async (req, res) => {

});

// delete method
router.delete('/:id', async (req, res) => {

});


module.exports = router;