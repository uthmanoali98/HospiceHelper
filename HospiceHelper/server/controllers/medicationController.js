const Medication = require('../models/Medication');
const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Add a new medication
const addMedication = async (req, res) => {
    try {
        const { medicationName, type, dosage, frequency, provider, patientId } = req.body;

        // Step 1: Call OpenAI API to generate "Fast Facts" for the medication
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are HospiceHelper, a medical assistant providing helpful facts and advice about medications." },
                { role: "user", content: `Can you provide information on why ${medicationName} is needed, potential side effects, and advice for taking this medication?` }
            ]
        });

        const fastFacts = aiResponse.choices[0].message.content;

        // Step 2: Create a new medication entry
        const newMedication = new Medication({
            medicationName,
            type,
            dosage,
            frequency,
            provider,
            patientId,
            notes: `Hospice Helper's Fast Facts about ${medicationName}: \n${fastFacts}`
        });

        await newMedication.save();

        // Step 3: Send a success response
        res.status(201).json({ message: 'Medication added successfully', medication: newMedication });
    } catch (error) {
        console.error("Error adding medication:", error);
        res.status(500).send("An error occurred while adding the medication.");
    }
};

const getMedicationsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const medications = await Medication.find({ patientId });
        res.status(200).json(medications);
    } catch (error) {
        console.error('Error fetching medications:', error);
        res.status(500).send('Failed to fetch medications');
    }
};

module.exports = {
    addMedication,
    getMedicationsByPatientId
};
