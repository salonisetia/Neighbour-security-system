const Alert = require('../models/Alert');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const postAlertHandler = async (req, res) => {
    try {
            const newAlert = new Alert({
                category: req.body.category,
                title: req.body.title,
                description: req.body.description,
                location: { address: req.body.location.address },
                userId: decoded.userId,
                status: 'pending'
            });

            await newAlert.save();
            return res.status(201).json({ message: "Alert posted successfully!", alert: newAlert });
        } catch (err) {

        console.error("Alert Save Error:", error);
        res.status(500).json({ error: "Failed to post alert" });
    }
};

module.exports = postAlertHandler;
