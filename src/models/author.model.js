const {Schema, model} = require("mongoose");

const authorSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    min: 1
  },
  biography: {
    type: String
  }
});

const Author = model('Author', authorSchema);

module.exports = Author;