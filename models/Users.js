const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    date: { //注册日期
        type: Date,
        default: Date.now
    },
    identity:{
        type:String,
        required:true
    }
})
module.exports = User = mongoose.model('users',UserSchema);//集合名，约束