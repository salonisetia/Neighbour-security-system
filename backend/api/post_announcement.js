const Announcement = require('../models/Announcement');

const postAnnouncementHandler = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
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

