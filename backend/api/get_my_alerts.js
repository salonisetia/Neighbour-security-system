const jwt = require('jsonwebtoken');
const Alert = require('../models/Alert');
const User = require('../models/User');
const SECRET_KEY = process.env.JWT_SECRET || "SafeNeighbour_Primary_Secret_99#";

const getMyAlertsHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId).select('_id');
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const alerts = await Alert.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching user alerts:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getMyAlertsHandler;

