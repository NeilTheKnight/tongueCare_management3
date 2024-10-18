const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { name, contactPerson, contactInfo, region } = req.body;
    const agent = new Agent({ name, contactPerson, contactInfo, region, user: req.user.id });
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating agent', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error: error.message });
  }
});

module.exports = router;