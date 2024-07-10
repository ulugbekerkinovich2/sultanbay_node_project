const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = model ('User', userSchema);

module.exports = User;