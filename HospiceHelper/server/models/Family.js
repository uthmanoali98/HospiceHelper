const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
    familyName: {
        type: String,
        required: true
    },
    familyMembers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    familyJoinKey: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Family', FamilySchema);