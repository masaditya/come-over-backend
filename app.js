const express = require("express")
const app = express();
const morgan = require('morgan');


// routes
const eventRoutes = require('./api/routes/events')
const ticketRoutes = require('./api/routes/tickets');

// middleware

app.use(morgan('dev'))

app.use('/event', eventRoutes)
app.use('/ticket', ticketRoutes)

// error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;