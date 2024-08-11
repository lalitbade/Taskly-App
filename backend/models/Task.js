const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  deadline: { 
    type: Date 
  },
  priority: { 
    type: String 
  },
  status: { 
    type: String, 
    default: 'To Do' 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  labels: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Label'
  }]
});

module.exports = mongoose.model('Task', taskSchema);
