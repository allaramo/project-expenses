const mongoose = require('mongoose');

//creates schema
const phaseSchema = mongoose.Schema({
  description: { type: String, required: true }
});

module.exports = mongoose.model('Phase', phaseSchema);
