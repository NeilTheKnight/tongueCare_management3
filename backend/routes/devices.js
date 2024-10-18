const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { deviceId, deviceType, firmwareVersion, clinicId } = req.body;
    const device = new Device({ deviceId, deviceType, firmwareVersion, clinic: clinicId });
    await device.save();
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Error creating device', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const devices = await Device.find().populate('clinic', 'name');
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices', error: error.message });
  }
});

module.exports = router;