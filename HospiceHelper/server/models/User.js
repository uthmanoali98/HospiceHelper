const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    }


});

module.exports = mongoose.model('User', UserSchema);