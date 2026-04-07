const Alert = require('../models/Alert');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "SafeNeighbour_Primary_Secret_99#";

const postAlertHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    
    const { category, title, description, location } = req.body;
    if (!category || !location?.address) {
      return res.status(400).json({ error: 'Category and location required' });
    }

    const newAlert = new Alert({
      category,
      title,
      description,
      location: { address: location.address },
      userId: decoded.userId,
      status: 'pending'
    });

    await newAlert.save();
    res.status(201).json({ message: "Alert posted successfully!", alert: newAlert });
  } catch (error) {
    console.error("Alert Save Error:", error);
    res.status(500).json({ error: "Failed to post alert" });
  }
};

module.exports = postAlertHandler;

