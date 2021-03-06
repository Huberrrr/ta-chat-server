const express = require('express');
const apiControl = require('./api/apiControl');
const router = express.Router();
const passport = require('passport');
const secrets = require('./api/secrets');
const cookieSession = require('cookie-session');
const path = require('path');
const passportSetup = require('./config/passport-setup');

// cookies
router.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: secrets.serializer
}));
router.use(passport.initialize());
router.use(passport.session());

// api routes
router.post('/logout', apiControl.logout);

// page routes
if (__filename.includes('server.js')) {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  router.get('/chat', (req, res) => {
    if (req.user === undefined) {
      res.redirect("/");
      return;
    }
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
} else {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  router.get('/chat', (req, res) => {
    if (req.user === undefined) {
      res.redirect("/");
      return;
    }
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
}

// auth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));
router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect("/chat");
});
router.get('/session', (req, res) => {
  res.send(req.user);
});

// static files
router.use('/js', express.static('public'));
router.use('/css', express.static('public'));

module.exports = router;
