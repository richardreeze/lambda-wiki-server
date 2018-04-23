const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    unique: true,
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry',
    required: true,
  }]
});

module.exports = mongoose.model('Category', categorySchema);
