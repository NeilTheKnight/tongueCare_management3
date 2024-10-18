const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Clinic', ClinicSchema);