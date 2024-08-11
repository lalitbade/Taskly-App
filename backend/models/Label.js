const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true // Ensure label names are unique
  },
  color: {
    type: String,
    required: true,
    default: 'blue' // Default color for user-created labels
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // This field is optional, it will only be set for user-created labels
  },
  isPredefined: {
    type: Boolean,
    default: false // Indicates if the label is predefined or created by the user
  }
});

const Label = mongoose.model('Label', labelSchema);
module.exports = Label;
