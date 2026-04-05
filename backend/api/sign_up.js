const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Uses the Master Blueprint
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; 

const signupHandler = async (req, res) => {
    try {
        const { name, email, password, location, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({ name, email, password, location, role });
        const savedUser =await newUser.save();
        console.log("DATA SAVED TO DB:", savedUser);

       const token = jwt.sign(
    { userId: newUser._id, email: newUser.email }, 
    SECRET_KEY, 
    { expiresIn: '1h' }
);
        res.status(201).json({ 
            message: "User registered successfully!",
            role: newUser.role,
            token: token 
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Database save failed. Check your connection." });
    }
};

module.exports = signupHandler;