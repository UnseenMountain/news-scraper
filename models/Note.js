var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    note: {
        type: String,
        required: false
    },

    Article: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }]

});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;