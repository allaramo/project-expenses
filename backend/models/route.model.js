const mongoose = require('mongoose');

//creates schema
const routeSchema = mongoose.Schema({
  path: { type: String, required: true }
});

module.exports = mongoose.model('Route', routeSchema);
