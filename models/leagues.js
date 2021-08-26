const mongoose= require('mongoose');
const Schema= mongoose.Schema

const leagueSchema = new Schema({
    commish:{type:String ,required:true},
    leagueName:{type:String, required:true},
    numbTeams:{type:Number, required:true},
    numbRounds:{type:Number, required:true},
    teams:{type:Array, required:true},
    currentTurn:{type: Number,default:1},
    //configure user obj to reflect obj of user_id, username, team
    users: [
        {
            user_id:{ type: String},
            username: { type: String },
            email: {type: String}
        }],
    messages:[],
    available:{ type:Array },
    picked:[
        {
            email:{type: String},
            id:{type: String},
            username: { type: String },
            pick:{type:Object}
        }
    ],
    draftTime:{type:Date},
    draftType:{type:String},
    draftOrder:{type:Array},
    status:{type:String, required:true},
})

const League = mongoose.model("League",leagueSchema)
module.exports = League;