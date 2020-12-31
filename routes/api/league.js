const express = require('express')
const router = express.Router();
const League = require("../../models/leagues");
const passport = require("../../config/passport");

router.post('/', function(req, res){
    console.log(req.body)
    League.create(req.body).then(data =>{res.json(data)})
})
router.post('/:id',function(req, res){
    console.log(req.params.id)
})
router.get('/:id',function(req, res){

})
module.exports = router;