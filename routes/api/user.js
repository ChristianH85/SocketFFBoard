const express = require('express')
const router = express.Router();
const User = require("../../models/users");
const passport = require("../../config/passport");
const League = require('../../models/leagues');
const userFn= require('../../controllers/users/userController')
require('dotenv').config();
const fs=require('fs')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/signup", async(req, res) => {
  let newuUser = await userFn.newUser(req.body)
  res.json(newuUser)
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/signup"}),
    function(req,res) {
      const userInfo={port:process.env.PORT, user:req.user}
      res.json(userInfo)
      console.log(process.env.PORT)
  }
);
router.get('/:id',function(req,res){
  User.findOne({_id:req.params.id}).populate('leagues').then(data=>{
    res.json(data)})
})
router.post('/leagues',function (req,res){
  //check if league exist within user 
  User.findByIdAndUpdate(req.body.user,{$push:{leagues:req.body.league}},{new:true}).then(data=>{
    let check={_id:req.body.league,'users.user_id':{$ne:data._id}}
    let addObj={
      _id:data._id,
      username:data.username,
      team:[]
    }
  League.findByIdAndUpdate(check,{$addToSet:{users:addObj}},{new: true}).then(data=>{
      console.log(data)
      res.json(data)
    })

  // console.log(req.body)
})
})
router.post('/avatar/:id',upload.single('file'),function(req,res, next){
  cloudinary.uploader.upload(req.file.path, { tags: 'avatar' })
    .then(function (image) {
      console.log('** file uploaded to Cloudinary service');
      fs.unlink(req.file.path, err=>{if(err){console.log(err)}})
      User.findByIdAndUpdate(req.params.id,{$set:{avatar:image.url}},{new:true})
      .then(data=>{
        res.json(data)
      })
    })
    .then(function () {
      console.log('** photo saved');

    })
})
router.get('/draftPick/:id?user=userId', function (req,res){

})
module.exports = router;