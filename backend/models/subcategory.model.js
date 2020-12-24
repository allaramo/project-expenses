const mongoose = require('mongoose');

//creates schema
const subcategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
