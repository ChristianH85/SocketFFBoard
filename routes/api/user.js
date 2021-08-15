const express = require('express')
const router = express.Router();
const User = require("../../models/users");
const passport = require("../../config/passport");
const League = require('../../models/leagues')


router.post("/signup", (req, res) => {
  console.log("user signup");
  console.log(req.body);
  const { email, password, username } = req.body;
  
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(err);
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
      console.log(req.user)
      // console.log(req.user)
      const userInfo={port:process.env.PORT, user:req.user}
      res.json(userInfo)
      console.log(process.env.PORT)
  }
);
router.get('/:id',function(req,res){
  console.log(req.body)
  User.findOne({_id:req.params.id}).populate('leagues').then(data=>{ console.log(data)
    res.json(data)})
})
router.post('/leagues',function (req,res){
  //check if league exist within user 
  User.findByIdAndUpdate(req.body.user,{$push:{leagues:req.body.league}},{new:true}).then(data=>{
    console.log(data)
    let check={_id:req.body.league,'users.user_id':{$ne:data._id}}
    let addObj={
      _id:data._id,
      username:data.username,
      team:[]
    }
    console.log(addObj)
    // res.json(data)})
    ////check if key of _id equals req.body.user._id in user
  League.findByIdAndUpdate(check,{$addToSet:{users:addObj}},{new: true}).then(data=>{
      console.log(data)
      res.json(data)
    })

  // console.log(req.body)
})
})
router.get('/draftPick/:id?user=userId', function (req,res){

})
module.exports = router;