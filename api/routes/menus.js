const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu');


router.get('/', async (req, res) => {
    await Menu.find().exec().then(menus => {
        res.status(200).json({
            size: menus.length,
            data: menus
        })
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:id', async (req, res) => {
    await Menu.findById(req.params.id).exec().then(menus => {
        res.status(200).json(menus)
    }).catch(err => {
        res.json(err)
    });
});




router.post("/", async (req, res) => {
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        menu: req.body.menu,
        price: req.body.price
    })

    await menu.save().then(result => {
        res.status(200).json({
            id: menu._id,
            data: menu
        })
    }).catch(err => {
        res.json(err)
    });
})

// update method
router.patch('/:id', async (req, res) => {

});

// delete method
router.delete('/:id', async (req, res) => {

});


module.exports = router;