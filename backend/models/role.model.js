const mongoose = require('mongoose');

//creates schema
const roleSchema = mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleSchema);
