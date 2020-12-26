const mongoose = require('mongoose');

//creates schema
const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
