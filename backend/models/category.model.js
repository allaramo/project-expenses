const mongoose = require('mongoose');

//creates schema
const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
