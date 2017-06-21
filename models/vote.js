var mongoose = require("mongoose");

var voteSchema = new mongoose.Schema({
   article_id: String,
   username: String,
   value: Number
});

module.exports = mongoose.model("Vote", voteSchema);