var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var cors = require('cors')

var author = require("./services/authorService")
var user = require("./services/userService")
var app = express();
app.use(cors());
app.use(bodyParser.json());



mongoose.connect(
  "mongodb+srv://koray:1@cluster0.h3bc62p.mongodb.net/?retryWrites=true&w=majority",
  (err) => {
    if (!err) {
      console.log("Connected to DB");
    }
  }
);

app.use('/author',author.router)
app.use('/user',user.router)
app.listen(8080);
