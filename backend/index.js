const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// ✅ Import handlers for all API endpoints
const getAnnouncementsHandler = require('./api/get_announcements'); 
const postAnnouncementHandler = require('./api/post_announcement');
const getAlertsHandler = require('./api/get_alert'); // Added for general feed
const postAlertHandler = require('./api/post_alert'); // Added to handle new posts
const getMyAlertsHandler = require('./api/get_my_alerts'); 
const verifyAlertHandler = require('./api/verify_alert'); // Added for admin verification

require('dotenv').config();

const app = express();

// ✅ CORS Configuration: Explicitly allowing your frontend domains
// app.use(cors({
//   origin: [
//     "https://neighbour-security-system-2u2t.vercel.app", 
//     "https://neighbour-security-system.vercel.app", 
//     "http://localhost:5173"
//   ], 
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// })); 
app.use(cors());

app.use(express.json()); 

// MongoDB connection with fallback
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://saloni:KEjr7FehAX3oaC8C@neighbourhood-security.kcujzhs.mongodb.net/security_db?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

const mongooseOptions = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
};

let dbConnectionPromise;
const connectToDatabase = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose.connect(mongoURI, mongooseOptions)
      .then(() => console.log("✅ MongoDB Connected Successfully"))
      .catch((error) => {
        dbConnectionPromise = undefined;
        throw error;
      });
  }
  return dbConnectionPromise;
};

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Standard Auth Routes (Login, Signup)
app.use('/api', authRoutes);

// API route mappings
app.get('/api/get_announcements', getAnnouncementsHandler);
app.post('/api/post_announcement', postAnnouncementHandler);
app.get('/api/get_alert', getAlertsHandler);
app.post('/api/post_alert', postAlertHandler);
app.get('/api/get_my_alerts', getMyAlertsHandler);
app.patch('/api/verify-alert/:id', verifyAlertHandler);

app.get('/api/health', async (req, res) => {
  try {
    const userCount = await mongoose.connection.db.collection('users').countDocuments();
    res.json({
      status: 'OK',
      dbConnected: mongoose.connection.readyState === 1,
      userCount,
      message: 'Backend healthy'
    });
  } catch (error) {
    res.status(500).json({ status: 'DB Error', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send("🚀 Neighbor Security API is live! Visit /api/health");
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectToDatabase()
    .then(() => app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`)))
    .catch((error) => {
      console.error('❌ Failed to connect to MongoDB:', error);
      process.exit(1);
    });
}

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app; // Export for Vercel deployment