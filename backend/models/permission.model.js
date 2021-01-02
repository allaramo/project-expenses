const mongoose = require('mongoose');

//creates schema
const permissionSchema = mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route"
  },
  status: { type: Boolean, required: true }
});

module.exports = mongoose.model('Permission', permissionSchema);
