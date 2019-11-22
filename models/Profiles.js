const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    describe: {
        type: String,
        required:true
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
