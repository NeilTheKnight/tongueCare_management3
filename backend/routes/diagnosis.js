const express = require('express');
const router = express.Router();
const Diagnosis = require('../models/Diagnosis');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { patientId, deviceId, diagnosisData, diagnosisResult } = req.body;
    const diagnosis = new Diagnosis({ patientId, deviceId, diagnosisData, diagnosisResult });
    await diagnosis.save();
    res.status(201).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: 'Error creating diagnosis', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find().populate('deviceId', 'deviceId');
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diagnoses', error: error.message });
  }
});

module.exports = router;