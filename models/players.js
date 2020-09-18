const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const playerSchema = new Schema({
    player: {type: String, required: true },
    team: { type: String, required: true },
    pos: { type: String, required: true },
    espn: { type: Number },
    ppr: { type: Number },
    age: { type: Number },
    available: { type: Boolean, default: true}
})

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;