const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    relationship: {
        type: String, // Example: Father, Mother, Sibling, etc.
        required: false
    },
    dob: {
        type: String, // Date of birth, stored as a string (can be converted to a Date object if needed)
        required: false
    },
    notes: {
        type: String, // Optional notes
        required: false
    }
});

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);