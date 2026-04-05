const authMiddleware = require('../middleware/auth');

const getUserProfile = [authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      username: user.username || user.name || '',
      email: user.email,
      houseNumber: user.houseNumber || '',
      password: user.password || '',
      profilePic: user.profilePic || ''
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}];

module.exports = getUserProfile;

