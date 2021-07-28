const express = require('express')
const router = express.Router();
const League = require("../../models/leagues");
const passport = require("../../config/passport");
const nodemailer = require('nodemailer');

router.post('/', function(req, res){
    // console.log(req.body)
    League.create(req.body).then(data =>{res.json(data)
        console.log(data)
        // const transporter = nodemailer.createTransport({
        //         service: 'gmail',
        //         auth: {
        //           user: process.env.EMAIL,
        //           pass: process.env.PWORD
        //         }
        //       })
        // const leagueID= data._id 
        // const leagueN= data.leagueName
        // const date= new Date(data.draftTime).toString()
        // data.teams.map((team)=>{
        //     const mailOptions = {
        //             from: process.env.EMAIL,
        //             to: `${team}`,
        //             subject: `League Invitation`,
        //             html: `<h4>You have been invited to join ${leagueN}</h4><h4>Your draft is scheduled for <strong>${date}</strong></h4><h4 Sign up at><a href='https://ff-draft-buddy.herokuapp.com/'>https://ff-draft-buddy.herokuapp.com/ </a></h4><h5>use the code <strong>${leagueID} </strong> to join your League</h5>`,
        //             replyTo: `please do not reply to this message`
        //           }
        //           transporter.sendMail(mailOptions, function(err, res) {
        //             if (err) {
        //               console.error('there was an error: ', err);
        //             } else {
        //               console.log('here is the res: ', res)
        //             }
        //           })

        // })
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'test-email@gmail.com',
        //       pass: 'test123'
        //     }
        //   })
        
        //   const mailOptions = {
        //     from: '',
        //     to: `${}`,
        //     subject: `League Invitation`,
        //     text: `You have been invited to join ${req.body.message} sign up here and use the code ${} to join your League`,
        //     replyTo: `please do not reply to this message`
        //   }
        //   transporter.sendMail(mailOptions, function(err, res) {
        //     if (err) {
        //       console.error('there was an error: ', err);
        //     } else {
        //       console.log('here is the res: ', res)
        //     }
        //   })
        })
})
router.post('/:id',function(req, res){
    console.log(req.params.id)
})
router.get('/:id',function(req, res){
    console.log(req.params.id)
    console.log('%%%%%%%%%%%Req.BODY%%%%%%%%%%%')
    console.log(req.body)
    League.findById(req.params.id).then(data=>{
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%')
      console.log(data)
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%')
      res.json(data)
    }).catch(err => {
        res.json(err);
      });
})
module.exports = router;