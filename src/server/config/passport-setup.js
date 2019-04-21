const passport = require('passport');
const google_strat = require('passport-google-oauth20');
const secrets = require('../api/secrets');
const schemaControl = require('../db/schemaControl');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  schemaControl.User.findById(id).then((user) => {
      done(null, user);
  });
});

passport.use(
	new google_strat({
    callbackURL: "/auth/google/redirect",
    clientID: secrets.clientID,
    clientSecret: secrets.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
    //google log in callback, triggered after consent
    //attempt to locate user by gid
    schemaControl.User
    .findOne({gid: profile.id})
    .then((currentUser) => {
      if(currentUser){ //user exists
        console.log("already logged in");
        done(null, currentUser);
      }
      else{ //register new user
        //console.log(profile);
        schemaControl.User.create({
          name: profile.displayName,
          gid: profile.id,
          picture: profile.photos[0].value
        })
        .then((user) => {
          console.log("Registered new user: " + profile.id + " " + profile.displayName);
          done(null, user);
        })
      }
    })
	})
);

