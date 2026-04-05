const Announcement = require('../models/Announcement');

const getAnnouncementsHandler = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = getAnnouncementsHandler;