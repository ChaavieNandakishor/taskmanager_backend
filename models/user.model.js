const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: String,
  lastName: String,
  profilePic: String,
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  roles: [String],
});

let User = mongoose.model("user_tb", userSchema);
module.exports = User;
