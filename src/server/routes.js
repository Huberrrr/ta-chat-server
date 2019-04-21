const express = require('express');
const apiControl = require('./api/apiControl');
const router = express.Router();
const passport = require('passport');
const secrets = require('./api/secrets');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');

router.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: secrets.serializer
}));
router.use(passport.initialize());
router.use(passport.session());

// api routes
router.post('/register', apiControl.register);
router.post('/login', apiControl.login);
router.post('/logout', apiControl.logout);

router.get('/', apiControl.index);
router.get('/dashboard', apiControl.dashboard);

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  //res.send(req.user);
  res.redirect("/dashboard");
});


module.exports = router;
