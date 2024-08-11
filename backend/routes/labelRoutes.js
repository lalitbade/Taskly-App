const express = require('express');
const router = express.Router();
const Label = require('../models/Label');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch all labels for the logged-in user and predefined labels
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;  // User ID from authentication middleware

    // Fetch labels associated with the user and predefined labels
    const labels = await Label.find({ $or: [{ user: userId }, { isPredefined: true }] });
    
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search labels for the logged-in user
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const query = req.query.q;
    const userId = req.user._id;

    // Search in both predefined and user-specific labels
    const labels = await Label.find({ 
      name: { $regex: query, $options: 'i' },
      $or: [{ user: userId }, { isPredefined: true }] 
    });
    
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new label for the logged-in user
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, color } = req.body;
    const userId = req.user._id;

    // Ensure the label is not already predefined or created by the user
    let label = await Label.findOne({ name, $or: [{ user: userId }, { isPredefined: true }] });

    if (!label) {
      label = new Label({ name, color, user: userId });
      await label.save();
    }

    res.json(label);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
