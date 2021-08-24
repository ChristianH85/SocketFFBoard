const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: {type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    team: { type: Array, default: [] },
    leagues:[{ type: Schema.Types.ObjectId, ref: 'League' }],
    avatar:{ type: String, default:'https://res.cloudinary.com/dm2obdaq7/image/upload/v1548726982/dog/lh52vb36jl386s8lefbu.jpg'}

})

userSchema.methods = {
    checkPassword: function(password){
        // console.log(bcrypt.compareSync(password,this.password))
        return bcrypt.compareSync(password,this.password)
    },
    hashPassword: function(password){
        return bcrypt.hashSync(password, 10)
    }
};

userSchema.pre('save', function (next){
    if (!this.password){
        console.log('No password')
    }else{
        console.log('Password Saved')
        this.password = this.hashPassword(this.password);
        next();
    }
})
const User = mongoose.model("User", userSchema);
module.exports = User;