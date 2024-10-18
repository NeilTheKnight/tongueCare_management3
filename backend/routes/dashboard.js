const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Agent = require('../models/Agent');
const Clinic = require('../models/Clinic');
const Device = require('../models/Device');
const auth = require('../middleware/auth');

router.get('/stats', auth, async (req, res) => {
  try {
    const [userCount, agentCount, clinicCount, deviceCount] = await Promise.all([
      User.countDocuments(),
      Agent.countDocuments(),
      Clinic.countDocuments(),
      Device.countDocuments(),
    ]);

    const deviceStatus = await Device.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const clinicsByRegion = await Clinic.aggregate([
      { $lookup: { from: 'agents', localField: 'agent', foreignField: '_id', as: 'agent' } },
      { $unwind: '$agent' },
      { $group: { _id: '$agent.region', count: { $sum: 1 } } },
    ]);

    res.json({
      totalUsers: userCount,
      totalAgents: agentCount,
      totalClinics: clinicCount,
      totalDevices: deviceCount,
      deviceStatus: deviceStatus.map(item => ({ name: item._id, value: item.count })),
      clinicsByRegion: clinicsByRegion.map(item => ({ name: item._id, value: item.count })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
});

module.exports = router;