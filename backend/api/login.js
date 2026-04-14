const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "SafeNeighbour_Primary_Secret_99#";

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role, message: "Login successful" });
    } catch (error) {
        console.error("LOGIN ERROR:", error.message, error.stack);
        res.status(500).json({ error: error.message || "Server error during login" });
    }
};

module.exports = loginHandler;
