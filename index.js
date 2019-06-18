const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const apiRoutes = require("./api-routes");
app.use(
  cors(),
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
// mongoose.connect("http://localhost:27017/resthub");

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));
// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Running RestHub on port " + port);
});
