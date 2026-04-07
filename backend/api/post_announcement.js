const Announcement = require('../models/Announcement');
const jwt = require('jsonwebtoken');

const postAnnouncementHandler = async (req, res) => {
  try {
    // Use req.user from authMiddleware
    const user = req.user;
    console.log('User from middleware:', user.role);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required - got role: ' + user.role });
    }

    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message required' });
    }

    const announcement = new Announcement({ message });
    await announcement.save();

    res.status(201).json(announcement);
  } catch (error) {
    console.error('Error posting announcement:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = postAnnouncementHandler;

