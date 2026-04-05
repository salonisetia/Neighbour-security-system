const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    houseNumber: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    profilePic: { type: String, default: '' },
    location: { type: String, required: true },
    role: { type: String, default: "resident" },
    
    // These fields allow the QuickSetup to save data later
    alertCategories: { type: [String], default: [] },
    alertRadius: { type: Number, default: 5 },
    gpsCoords: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null }
    },
    detailedAddress: { type: String, default: "" },
    notificationPref: { type: String, default: "Email Alerts" },
    setupComplete: { type: Boolean, default: false }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

