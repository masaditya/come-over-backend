const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const Temp = require('./api/models/temp');
const http = require('http').Server(app);
const io = require('socket.io')(http);


// routes
const eventRoutes = require("./api/routes/events");
const ticketRoutes = require("./api/routes/tickets");
const userRoutes = require('./api/routes/users');
const menuRoutes = require('./api/routes/menus');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
  "mongodb+srv://new_user:new_user@mycluster-iwasj.mongodb.net/come-over?retryWrites=true", {
    useNewUrlParser: true
  }
);

mongoose.Promise = global.Promise;

// middleware
app.use(cors())
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);
app.use("/user", userRoutes);
app.use("/menu", menuRoutes, (req, res) => {
  io.emit('message', req.body);
});
app.use("/order", orderRoutes, (req, res) => {
  io.emit('message', req.body);
});


app.use('/temp', async (req, res) => {
  await Temp.find().select("menu price").exec().then(menus => {
    res.status(200).json({
      size: menus.length,
      data: menus
    })
  }).catch(err => {
    res.json(err)
  })
})


io.on('connection', () => {
  console.log('a user is connected')
})


// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/", (req, res) => {
  res.json({
    message: "hello there"
  })
})

module.exports = app;