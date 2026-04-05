const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    message: { 
        type: String, 
        required: true 
    },
    sender: { 
        type: String, 
        default: "Admin" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Announcement', announcementSchema);
