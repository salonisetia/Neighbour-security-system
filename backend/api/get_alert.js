const Alert = require('../models/Alert');

const getAlertsHandler = async (req, res) => {
    try {
        // Fetch all alerts from the 'alerts' collection
        // .sort({ createdAt: -1 }) ensures newest alerts appear first
        const alerts = await Alert.find().sort({ createdAt: -1 });
        
        res.status(200).json(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({ error: "Failed to fetch alerts" });
    }
};

module.exports = getAlertsHandler;