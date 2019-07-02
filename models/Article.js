const mongoose = require("mongoose");

// save a ref to the Schema constructor
const Schema = mongoose.Schema;

// Use Schema constructor, create a new UserSchema obj
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
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
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Creates the model from the above Schema, uses Mongoose model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;