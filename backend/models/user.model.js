const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//creates schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  status: { type: Boolean, required: true },
  logged: { type: Boolean, required: true },
});

//validates the email is unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
