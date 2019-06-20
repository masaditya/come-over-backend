const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Menu = require("../models/menu");
const Order = require("../models/order");
const Temp = require("../models/temp");

router.get("/", async (req, res) => {
  await Order.find()
    .exec()
    .then(menus => {
      res.status(200).json({
        size: menus.length,
        data: menus
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:id", async (req, res) => {
  await Order.findById(req.params.id)
    .exec()
    .then(menus => {
      res.status(200).json(menus);
    })
    .catch(err => {
      res.json(err);
    });
});

// post new order
router.post("/", async (req, res) => {
  var order = new Order({
    _id: new mongoose.Types.ObjectId(),
    customer: req.body.customer,
    menus: req.body.menus,
    total: req.body.total
  });
  await order
    .save()
    .then(result => {
      res.json({
        msg: "order created",
        data: order
      });
      Temp.remove({}).exec().then().catch()
    })
    .catch(err => {
      res.json(err);
    });
});

// add menu in order
router.post("/:id", async (req, res) => {
  console.log(req.params.id);
  await Menu.findById(req.params.id)
    .exec()
    .then(doc => {
      var temp = new Temp({
        _id: new mongoose.Types.ObjectId(),
        id: doc._id,
        menu: doc.menu,
        price: doc.price
      });
      console.log(temp);
      temp
        .save()
        .then(result => {
          res.json({
            menu: temp
          });
        })
        .catch(err => {
          res.json(err);
        });
    });
});

// update method
router.patch("/:id", async (req, res) => {});

// delete method
router.delete("/:id", async (req, res) => {});

module.exports = router;