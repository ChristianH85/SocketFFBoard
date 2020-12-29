const express = require('express')
const router = express.Router();
const User = require("../../models/users");
const passport = require("../../config/passport");

router.post("/signup", (req, res) => {
  console.log("user signup");
  console.log(req.body);
  const { email, password, username } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      console.log("creating new user");
      const newUser = new User({
        username: username,
        password: password,
        email: email
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/signup"}),
    function(req,res) {
      res.json(req.user)
      // socket.emit('user',data)
      // res.redirect('/');
  }
);
module.exports = router;