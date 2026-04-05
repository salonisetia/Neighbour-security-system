const Announcement = require('../models/Announcement');
const jwt = require('jsonwebtoken');

const postAnnouncementHandler = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token and check for admin role
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        if (decoded.role !== 'admin') {
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