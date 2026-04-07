const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const getAnnouncementsHandler = require('./api/get_announcements'); 
const postAnnouncementHandler = require('./api/post_announcement');

require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true
})); 

app.use(express.json()); 

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://saloni:KEjr7FehAX3oaC8C@neighbourhood-security.kcujzhs.mongodb.net/security_db?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error: ", err));

// Routes
// Routes
app.use('/api', authRoutes);

// Global error handler for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Local dev server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
}

module.exports = app; // Required for Vercel

