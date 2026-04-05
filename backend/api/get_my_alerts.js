const authMiddleware = require('../middleware/auth');
const Alert = require('../models/Alert');

const getMyAlerts = [authMiddleware, async (req, res) => {
  try {
    // Filter alerts by the user ID attached by authMiddleware
    const alerts = await Alert.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching user alerts:', error);
    res.status(500).json({ error: 'Server error' });
  }
}];

module.exports = getMyAlerts;