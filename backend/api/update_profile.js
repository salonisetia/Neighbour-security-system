const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const updateProfile = [authMiddleware, async (req, res) => {
  try {
    const updates = {
      username: req.body.username,
      houseNumber: req.body.houseNumber,
      phoneNumber: req.body.phoneNumber || req.body.password, // Support both fields
      profilePic: req.body.profilePic
    };

    // Remove empty fields
    Object.keys(updates).forEach(key => {
      if (!updates[key]) delete updates[key];
    });
    const user = await User.findByIdAndUpdate(
      req.user._id, 
      updates, 
      { new: true, runValidators: true }
    ).select('-password');
    res.json({
      message: 'Profile updated successfully',
      user: {
        username: user.username || user.name || '',
        email: user.email,
        houseNumber: user.houseNumber || '',
        phoneNumber: user.phoneNumber || '',
        profilePic: user.profilePic || ''
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}];

module.exports = updateProfile;
