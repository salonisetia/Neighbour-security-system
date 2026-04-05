const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  title: String,
  message: String,
  description: String,
  location: {
    address: String
  },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'resolved'], 
    default: 'pending' 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Alert', AlertSchema);
