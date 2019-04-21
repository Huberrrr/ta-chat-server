const express = require('express');
const apiControl = require('./api/apiControl');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

// api routes
router.post('/register', apiControl.register);
router.post('/login', apiControl.login);
router.post('/logout', apiControl.logout);

router.get('/dashboard', apiControl.dashboard);

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

module.exports = router;
