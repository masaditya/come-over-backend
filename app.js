const express = require("express")
const app = express();

// routes
const eventRoutes = require('./api/routes/events')
const ticketRoutes = require('./api/routes/tickets');

// middleware
app.use('/event', eventRoutes)
app.use('/ticket', ticketRoutes)

module.exports = app;