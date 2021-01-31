const mongoose= require('mongoose');
const Schema= mongoose.Schema

const leagueSchema = new Schema({
    commish:{type:String ,required:true},
    leagueName:{type:String, required:true},
    numbTeams:{type:Number, required:true},
    numbRounds:{type:Number, required:true},
    teams:{type:Array, required:true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages:[],
    draftTime:{type:Date},
    draftType:{type:String},
    draftOrder:{type:Array},
    status:{type:String, required:true},
})

const League = mongoose.model("League",leagueSchema)
module.exports = League;