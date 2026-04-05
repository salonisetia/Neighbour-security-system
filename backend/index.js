const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
// Import the announcement handlers
const getAnnouncementsHandler = require('./api/get_announcements'); 
const postAnnouncementHandler = require('./api/post_announcement');

require('dotenv').config();

const app = express();

// Update CORS to allow your deployed frontend URL in production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ["https://your-frontend-deployment.vercel.app"] 
    : true,
  credentials: true
})); 

app.use(express.json()); 

// Use Environment Variable for MongoDB URI with the hardcoded one as a fallback
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://saloni:KEjr7FehAX3oaC8C@neighbourhood-security.kcujzhs.mongodb.net/security_db?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error: ", err));

// Existing Auth Routes
app.use('/api', authRoutes);

// Announcement Routes
app.get('/api/get_announcements', getAnnouncementsHandler);
app.post('/api/post-announcement', postAnnouncementHandler);

// IMPORTANT: Ensure you have renamed 'ge_my_alerts.js' to 'get_my_alerts.js' in your api folder
app.get('/api/my-alerts', require('./api/get_my_alerts'));

// Start server only if running locally
// Change this part at the end of your file
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
}

module.exports = app; // Required for Vercel