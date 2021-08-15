const app=require('express')
const passport = require("passport");
const auth= require('../controllers/auth/auth')
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");
// app.use(passport.initialize());
// app.use(passport.session());
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // console.log(email,password)
      // When a user tries to sign in this code runs
      db.User.findOne({
          email: email
      }).populate('leagues').then(function(dbUser) {
        // console.log(dbUser)
        // If there's no user with the given email
        if (!dbUser) {
          console.log("Incorrect email.")
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.checkPassword(password)) {
          console.log("Incorrect password.")
          return done(null, false, {
            message: "Incorrect password."
          });
        }else{
          console.log('%%%%%%%%%%USERLOGIN%%%%%%%%%%%%%%')
          console.log(dbUser)
          const token=auth.signToken(dbUser.email,dbUser.username,dbUser._id)
          let user={
            JWTtoken: token,
            username:dbUser.username,
            leagues:dbUser.leagues,
            _id:dbUser._id, 
            email:dbUser.email,
            team:dbUser.team
          }
          return done(null, user);}
        // If none of the above, return the user
        // console.log("34"+dbUser)
        
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;