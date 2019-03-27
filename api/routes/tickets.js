const express = require('express');
const router = express.Router();


// get method
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'handling get event'
    })
})

router.get('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    res.status(200).json({
        message: "handling event with id : " + id

    })
})


// post method 
router.post("/", (req, res) => {
    res.status(200).json({
        message: 'handling post event'
    })
})

// update method
router.patch('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    res.status(200).json({
        message: "handling update event with id : " + id

    })
});

// delete method
router.delete('/:ticketId', (req, res) => {
    const id = req.params.ticketId;
    res.status(200).json({
        message: "delete event with id : " + id
    });
});

module.exports = router;