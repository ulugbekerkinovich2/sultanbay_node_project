const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true
  },
  existence: {
    type: Boolean,
    default: true,
  }
});

const Book = model('Book', bookSchema);

module.exports = Book;