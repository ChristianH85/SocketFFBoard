const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const playerSchema = new Schema({
    rank: { type: Number, required: true },
    name: {type: String, required: true },
    team: { type: String, required: true },
    pos: { type: String, required: true },
    bye: { type: Number, required: true },
})

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;