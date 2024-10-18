const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
  },
  diagnosisData: {
    type: Object,
    required: true,
  },
  diagnosisResult: {
    type: String,
    required: true,
  },
  diagnosisDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);