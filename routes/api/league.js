const express = require('express')
const router = express.Router();
const League = require("../../models/leagues");
const email=require('../../controllers/email/emailController')
const Readxlsx =require('../../controllers/players/playerController')
// const xlsx=require('../../controllers/players/')
router.post('/', async function(req, res){
  let pList=await Readxlsx()
  console.log(pList)
  let lObj=req.body
  lObj['available']=pList.rows
    League.create(lObj).then(data =>{
        console.log(data)
        // email.sendInvites(data._id, data.leagueName, data.draftTime, data.teams)
        res.json(data)
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
      // console.log(data)
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%')
      res.json(data)
    }).catch(err => {
        res.json(err);
      });
})
module.exports = router;