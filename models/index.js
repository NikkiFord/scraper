const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://nikki:Central6@fit-to-scrape-pfok0.azure.mongodb.net/test?retryWrites=true&w=majority");

module.exports = {
  User: require("./user.js"),
  Article: require("./article.js"),
  Comment: require("./comment.js")
};
