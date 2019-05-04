const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const mongoose = require('mongoose');
const multer = require('multer');
const cekAuth = require('../middleware/auth');
const cloudinary = require('cloudinary');

require('../middleware/cloudinary');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    // reject file
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        callback(null, true);

    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// get method
router.get('/', (req, res) => {
    Event.find().exec().then(events => {
        res.status(200).json(events)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:eventId', (req, res) => {
    const id = req.params.eventId;
    Event.findById(id).exec().then(event => {
        res.json(event)
    }).catch(err => {
        res.json(err)
    })
})


// post method 
router.post("/", (req, res) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        nameEvent: req.body.nameEvent,
        locationEvent: req.body.locationEvent,
        timeEvent: req.body.timeEvent,
        posterEvent: req.body.posterEvent,
        descEvent: req.body.descEvent,
        organizerEvent: req.body.organizerEvent,
        categoryEvent: req.body.categoryEvent
    })

    event.save().then(result => {
        console.log(result)
        res.status(200).json(event)
    }).catch(err => {
        console.log(err)
        res.json(err)
    });
})

// update method
router.patch('/:eventId', cekAuth, (req, res) => {
    const id = req.params.eventId;

    Event.update({
        _id: id
    }, {
        $set: {
            nameEvent: req.body.name,
            locationEvent: req.body.location,
            timeEvent: req.body.time,
            posterEvent: req.body.poster,
            descEvent: req.body.desc,
            organizerEvent: req.body.organizer,
            categoryEvent: req.body.category
        }
    }).exec().then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
});

// delete method
router.delete('/:eventId', cekAuth, (req, res) => {
    const id = req.params.eventId;
    Event.remove({
        _id: id
    }).exec().then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err);
    })
});


router.post("/poster", upload.single('poster'), async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
    res.json({
        url: result.url
    })
})


module.exports = router;