const express = require('express');
const router = express.Router();
const Clinic = require('../models/Clinic');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { name, address, contactInfo, agentId } = req.body;
    const clinic = new Clinic({ name, address, contactInfo, agent: agentId });
    await clinic.save();
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating clinic', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const clinics = await Clinic.find().populate('agent', 'name');
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinics', error: error.message });
  }
});

module.exports = router;