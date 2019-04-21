const passport = require('passport');
const google_strat = require('passport-google-oauth20');
const keys = require('../api/secrets');

passport.use(
	new google_strat({
		//gs options
    callbackURL: "/auth/google/redirect",
    clientID: keys.clientID,
    clientSecret: keys.clientSecret

	}, (accessToken, refreshToken, profile, done) => {
		//passport callback
	})
);

