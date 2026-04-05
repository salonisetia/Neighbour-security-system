const express = require('express');
const router = express.Router();

const signupHandler = require('../api/sign_up'); 
const quickSetupHandler = require('../api/QuickSetup'); 
const postAlertHandler = require('../api/post_alert');
const authMiddleware = require('../middleware/auth');
const getAlertsHandler = require('../api/get_alert');
const loginHandler = require('../api/login');
const verifyAlertHandler = require('../api/verify_alert');
const getAnnouncementsHandler = require('../api/get_announcements');
const postAnnouncementHandler = require('../api/post_announcement');
const getUserProfileHandler = require('../api/get_user_profile');
const updateProfileHandler = require('../api/update_profile');

router.post('/signup', signupHandler);
router.post('/quicksetup', quickSetupHandler); 
router.post('/post_alert', authMiddleware, postAlertHandler); 
router.get('/get_alert', getAlertsHandler);
router.post('/login', loginHandler);
router.patch('/verify-alert/:id', verifyAlertHandler);
router.get('/get_announcements', getAnnouncementsHandler);
router.post('/post-announcement', postAnnouncementHandler);

router.get('/user-profile', getUserProfileHandler);
router.put('/update-profile', updateProfileHandler);

module.exports = router;