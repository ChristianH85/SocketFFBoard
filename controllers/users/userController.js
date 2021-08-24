const User = require("../../models/users");
const passport = require("../../config/passport");
const League = require('../../models/leagues')
const auth= require('../auth/auth')
module.exports={
    newUser:(body)=>{
        console.log("user signup");
  console.log(body);
  const { email, password, username } = body;
  
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      return{
        error: `Sorry, already a user with the Email ${email}`
      };
    } else {
      console.log("creating new user");
      const newUser = new User({
        username: username,
        password: password,
        email: email
      });
      newUser.save(async(err, savedUser) => {
        if (err) return err;
        const token= await auth.signToken(savedUser.email,savedUser.username,savedUser._id)
          let user={
            JWTtoken: token,
            username:savedUser.username,
            leagues:savedUser.leagues,
            _id:savedUser._id, 
            email:savedUser.email,
            team:savedUser.team,
            avatar:savedUser.avatar
          }
          return(user)
        // res.json(user);
      });
    }
  });
    },
    changePassword:()=>{

    },
    joinLeague:()=>{

    },
    changeEmail:()=>{

    }
}