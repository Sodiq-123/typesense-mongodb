const express = require('express'),
  config = require('./app'),
  path = require("path"),
  app = config(express()),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').config();
;
app.set("port", process.env.PORT || 5000);


// connect mongoose and check for errors if any
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log('Database Connected'))
  .catch(() => console.log('Error in connecting to Database'));

//  Server
const server = app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"));
});