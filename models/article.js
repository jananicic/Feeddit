var mongoose = require("mongoose");

var articleSchema = new mongoose.Schema({
   headline: String,
   link: String,
   author: String,
   username: String,
   points: Number
});

module.exports = mongoose.model("Article", articleSchema);