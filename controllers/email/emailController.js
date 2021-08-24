const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'fantasydraftbuddy@gmail.com',
              pass: '11odoylerules'
            }
          })

const renderPicks=(arr)=>{
    arr.forEach((pick,i)=>{
        return(
            `\n<p> ${i}. ${pick.name} ${pick.pos} ${pick.team} bye week: ${pick.bye}</p>`
        )
    })
}
module.exports={

    // sendInvites:(id,leagueName,draftTime,teams)=>{ 
    //     const date= new Date(draftTime).toLocaleString()
    //     teams.map((team)=>{
    //             const mailOptions = {
    //                     from: process.env.EMAIL,
    //                     to: `${team}`,
    //                     subject: `League Invitation`,
    //                     html: `<h4>You have been invited to join ${leagueName}</h4><h4>Your draft is scheduled for <strong>${date}</strong></h4><h4 Sign up at><a href='https://ff-draft-buddy.herokuapp.com/'>https://ff-draft-buddy.herokuapp.com/ </a></h4><h5>use the code <strong>${id} </strong> to join your League</h5>`,
    //                     replyTo: `please do not reply to this message`
    //                   }
    //                   transporter.sendMail(mailOptions, function(err, res) {
    //                     if (err) {
    //                       console.error('there was an error: ', err);
    //                     } else {
    //                       console.log('here is the res: ', res)
    //                     }
    //                   })
    //         })

    // },
    // sendDraftFinal:(pList, league)=>{
    //     pList.map((team)=>{
    //         const mailOptions = {
    //                 from: process.env.EMAIL,
    //                 to: `${team}`,
    //                 subject: `Draft Results`,
    //                 html: `<h4>${league} Draft Results</h4><h4>Your Team: ${team.name} ${renderPicks(team.picks)} \n Thanks for Playing with Us by which I mean me, \n Christian K. Henry`,
    //                 replyTo: `please do not reply to this message`
    //               }
    //               transporter.sendMail(mailOptions, function(err, res) {
    //                 if (err) {
    //                   console.error('there was an error: ', err);
    //                 } else {
    //                   console.log('here is the res: ', res)
    //                 }
    //               })

    //     })
        
    // },
    sendForgotPass:()=>{

    }
}