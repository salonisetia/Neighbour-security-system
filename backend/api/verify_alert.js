const Alert = require('../models/Alert');

const verifyAlertHandler = async (req, res) => {
    try {
        // Find the alert and update its status to 'verified'
        const updatedAlert = await Alert.findByIdAndUpdate(
            req.params.id, 
            { status: 'verified' }, 
            { new: true }
        );
        res.status(200).json(updatedAlert);
    } catch (error) {
        res.status(500).json({ error: "Failed to verify alert" });
    }
};

module.exports = verifyAlertHandler;