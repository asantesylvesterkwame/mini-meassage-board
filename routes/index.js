var express = require("express");
var router = express.Router();
const moment = require("moment");
const messageModel = require("../models/message.model");

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
router.get("/", async function (req, res, next) {
  const messageData = await messageModel.find();
  const formattedMessages = messageData.map((message) => ({
    ...message.toObject(),
    added: moment(message.added), // Convert the string to a moment object
  }));
  res.render("index", {
    title: "Mini Messageboard",
    messages: formattedMessages,
  });
  next();
});
router.get("/new", function (req, res, next) {
  res.render("form");
});
router.post("/new", async function (req, res, next) {
  try {
    if (req.body.messageText == "") {
      if (req.body.author == "") {
        return res.render("form", { errorMsg: "Nothing to send, Try again" });
      }
    } else {
      await messageModel.create({
        author: req.body.author,
        textMessage: req.body.textMessage,
        added: moment(),
      });

      res.redirect("/");
    }
    res.send("submitted succefully");
    res.json({ messageInfo: messageModel });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
