const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const messageSchema= new Schema({
    username:{type:String, require:true},
    leagueID:{type:String, require:true},
    date:{type: Date, default: Date.now},
    msg:{type: String, required:true}
})
const Message = mongoose.model("Message",messageSchema)
module.exports = Message;