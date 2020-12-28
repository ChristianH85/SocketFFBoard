const mongoose= require('mongoose');
const Schema= mongoose.Schema

const leagueSchema = new Schema({
    commish:{type:String, required:true },
    leagueName:{type:String, required:true},
    numbTeams:{type:Number, required:true},
    numbRounds:{type:Number, required:true},
    teams:{type:Array, required:true},
    messages:[{ type: Schema.Types.ObjectId, ref: 'Message' }],
    draftTime:{type:Date},
    
})

const League = mongoose.model("League",leagueSchema)
module.exports = League;