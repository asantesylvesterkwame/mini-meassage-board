const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const moment = require("moment");

const messageModel = new Schema({
  author: {
    type: String,
  },
  textMessage: {
    type: String,
  },
  added: {
    type: Date,
    default: moment(Date.now),
  },
});

module.exports = mongoose.model("message", messageModel);
