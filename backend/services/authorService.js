var express = require("express")
var router = express.Router();
var user = require('./userService')
var Author = require("../models/author")


router.post("", (req, res) => {
  var authorData = req.body;
  var author = new Author(authorData);
  author.save((error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500).send({ message: error });
    }
    return res.sendStatus(201);
  });
});

router.get("",user.checkAuthenticated,async (req, res) => {
  var authors = await Author.find({}, "-__v");
  console.log(req.header('authorization'))
  res.send(authors);
});

var author = {router}

module.exports = author