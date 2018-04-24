const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = new Schema({
  title: {
    unique: true,
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  pending: {
    type: Boolean,
    required: true,
    default: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Entry', entrySchema);
