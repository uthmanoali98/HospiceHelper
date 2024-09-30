const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    medicationName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    notes: {
        type: String, // AI-generated content will go here
    },
    patientId: {
        type: String // Assuming you have a Patient model
    }
});

module.exports = mongoose.model('Medication', MedicationSchema);
