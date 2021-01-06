const mongoose = require('mongoose');

//creates schema
const expenseSchema = mongoose.Schema({
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  phase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Phase"
  },
  projectPhase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectPhase"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
