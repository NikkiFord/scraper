const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("Article", new Schema({
  headline: String,
  summary: String,
  url: String
}));
