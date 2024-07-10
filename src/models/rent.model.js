const {Schema, model} = require("mongoose");

const rentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  rentDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  returnDate: {
    type: Date
  },
  isRented: {
    type: Boolean,
    default: false,
  }
});

const Rent = model('Rent', rentSchema);

module.exports = Rent;