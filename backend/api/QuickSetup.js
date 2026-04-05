const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; 

const quickSetupHandler = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "No token provided" }); // Added return
        }
     
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" }); // Added return
            }

            const { selectedAlerts, radius, location, address, notificationPref } = req.body;

            const updatedUser = await User.findOneAndUpdate(
                { email: decoded.email }, 
                { 
                    $set: { 
                        alertCategories: selectedAlerts,
                        alertRadius: radius,
                        gpsCoords: location,
                        detailedAddress: address,
                        notificationPref: notificationPref,
                        setupComplete: true
                    } 
                },
                { returnDocument: 'after' }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" }); // Added return
            }

            // This is the final response. Use 'return' to be safe.
            return res.status(200).json({ message: "Quick Setup Completed!" }); 
        });
    } catch (error) {
        console.error("Update Error:", error);
        // Ensure only one response is sent in the catch block
        if (!res.headersSent) {
            return res.status(500).json({ error: "Update failed" });
        }
    }
};

module.exports = quickSetupHandler;