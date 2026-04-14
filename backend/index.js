const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Import handlers for specific API endpoints
const getAnnouncementsHandler = require('./api/get_announcements'); 
const postAnnouncementHandler = require('./api/post_announcement');
const getMyAlertsHandler = require('./api/get_my_alerts'); // Added this for your "My Alerts" page

require('dotenv').config();

const app = express();

// ✅ FIX 1: Explicit CORS Configuration
// Using 'origin: true' works, but specifying your frontend URL is safer for production
app.use(cors({
  origin: [
    "https://neighbour-security-system-2u2t.vercel.app", 
    "https://neighbour-security-system.vercel.app", 
    "http://localhost:5173"
  ], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
})); 

app.use(express.json()); 

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://saloni:KEjr7FehAX3oaC8C@neighbourhood-security.kcujzhs.mongodb.net/security_db?retryWrites=true&w=majority';

// ✅ FIX 2: Optimized MongoDB connection for Serverless
mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000 // Fails fast if DB is down instead of hanging
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error: ", err));

// Routes
app.use('/api', authRoutes);

// ✅ FIX 3: Map your standalone handlers to routes
// These ensure that when the frontend calls /api/get_announcements, the right file handles it
app.get('/api/get_announcements', getAnnouncementsHandler);
app.post('/api/post_announcement', postAnnouncementHandler);
app.get('/api/get_my_alerts', getMyAlertsHandler);
app.get('/', (req, res) => {
  res.send("🚀 Neighbor Security API is live and connected!");
});

// Global error handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Local dev server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
}

module.exports = app; // Required for Vercel