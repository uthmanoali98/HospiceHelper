const Patient = require('../models/Patient');
const Family = require('../models/Family');
const KeyGenerator = require('../util/KeyGenerator');

// Create a new patient
const createPatient = async (req, res) => {
    try {
        const { firstName, lastName, diagnosis, familyId } = req.body;

        if (!firstName || !lastName || !diagnosis) {
            return res.status(400).json({ error: 'First name, last name, diagnosis, and family ID are required' });
        }

        // const family = await Family.findById(familyId);
        // if (!family) {
        //     return res.status(404).json({ error: 'Family not found' });
        // }

        // Combine firstName and lastName to form the name
        const name = `${firstName} ${lastName}`;
        const patientId = await KeyGenerator.generateSchemaId('Patient', Patient)

        const newPatient = new Patient({
            name,
            firstName,
            lastName,
            diagnosis,
            family: familyId,
            patientId
        });

        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: 'Error creating patient', details: error.message });
    }
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('family');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patients', details: error.message });
    }
};

// Get patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('family');
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patient', details: error.message });
    }
};

// Update patient by ID
const updatePatient = async (req, res) => {
    try {
        const { name, firstName, lastName, diagnosis, familyId } = req.body;

        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        if (familyId) {
            const family = await Family.findById(familyId);
            if (!family) {
                return res.status(404).json({ error: 'Family not found' });
            }
            patient.family = familyId;
        }

        patient.name = name || patient.name;
        patient.firstName = firstName || patient.firstName;
        patient.lastName = lastName || patient.lastName;
        patient.diagnosis = diagnosis || patient.diagnosis;

        await patient.save();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Error updating patient', details: error.message });
    }
};

// Delete patient by ID
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting patient', details: error.message });
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};
