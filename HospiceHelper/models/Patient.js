const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Family'
    }
});

module.exports = mongoose.model('Patient', PatientSchema);