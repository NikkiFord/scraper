const mongoose = require("mongoose");

mongoose.connect("mongodb://nikki:F5d9117FKHvj@ds064188.mlab.com:64188/scraper-home-work");

module.exports = {
  User: require("./user.js"),
  Article: require("./article.js"),
  Comment: require("./comment.js")
};
