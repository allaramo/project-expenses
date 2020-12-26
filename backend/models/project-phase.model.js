const mongoose = require('mongoose');

//creates schema
const projectPhaseSchema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  phase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phase"
  },
  percentage: { type: Number, required: true },
  status: { type: String, required: true },
  order: { type: Number, required: true }
});

module.exports = mongoose.model('ProjectPhase', projectPhaseSchema);
