var express = require("express");
var router = express.Router();
const moment = require("moment");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: moment(Date.now()),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: moment(Date.now()),
  },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});
router.get("/new", function (req, res, next) {
  res.render("form");
});
router.post("/new", function (req, res, next) {
  messages.push({
    text: req.body.author,
    user: req.body.messageText,
    added: moment(Date.now()),
  });
  res.redirect("/");
});
console.log(messages);
module.exports = router;
