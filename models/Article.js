var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    headLine: {
        type: String,
        required: true
    },

    summery: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
       default: false
    },
    // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  Note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

var Article = mongoose.module("Article", ArticleSchema);

module.exports = Article;

