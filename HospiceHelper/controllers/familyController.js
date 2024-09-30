const Family = require('../models/Family')
const User = require('../models/User')
const KeyGenerator = require('../util/KeyGenerator')

const createFamily = async (req, res) => {

    console.log(KeyGenerator.generateFamilyJoinKey(8)); // This should log a random key

    try {
        const { familyName } = req.body;

        if (!familyName) {
            return res.status(400).json({ error: 'All families need a name' });
        }

        const familyJoinKey = KeyGenerator.generateFamilyJoinKey(8);
        const familyId = KeyGenerator.generateSchemaId('Family', Family)

        const newFamily = new Family({
            familyName,
            familyJoinKey,
            familyId
        });


        await newFamily.save();
        res.status(201).json(newFamily);
    } catch (error) {
        res.status(500).json({ error: 'Error creating family', details: error.message });
    }
}

const getFamilyById = async (req, res) => {
    try {
        const family = await Family.findById(req.params.id)
            .populate('patient')
            .populate('members');

        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching family', details: error.message })
    }
}

const getAllFamilies = async (req, res) => {
    try {
        // Fetch all families from the Family collection
        const families = await Family.find()
            .populate('patient') // If you want to populate patient field
            .populate('familyMembers'); // If you want to populate family members

        res.status(200).json(families);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching families', details: error.message });
    }
};

// Add a member to a family
const addFamilyMember = async (req, res) => {
    try {
        const { familyId, userId } = req.body;

        if (!familyId || !userId) {
            return res.status(400).json({ error: 'Family ID and user ID are required' });
        }

        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        const user = await User.findById({ userId }); // Ensure the User model is being referenced
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the user to the family's members array
        family.familyMembers.push(user._id);

        await family.save();

        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ error: 'Error adding member to family', details: error.message });
    }
};

// Remove a member from a family
const removeFamilyMember = async (req, res) => {
    try {
        const { familyId, userId } = req.body;

        if (!familyId || !userId) {
            return res.status(400).json({ error: 'Family ID and user ID are required' });
        }

        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        // Remove the user from the family's members array
        family.familyMembers = family.familyMembers.filter(member => member.toString() !== userId);

        await family.save();

        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ error: 'Error removing member from family', details: error.message });
    }
}

const addPatientToFamily = async (req, res) => {
    try {
        const { familyId, patientId } = req.body;

        if (!familyId || !patientId) {
            return res.status(400).json({ error: 'Family ID and patient ID are required' });
        }

        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        const patient = await User.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Update the patient field in the family
        family.patient = patientId;

        await family.save();

        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ error: 'Error adding patient to family', details: error.message });
    }
};


const findFamilyByJoinKey = async (req, res) => {
    try {
        const { familyJoinKey } = req.params;

        // Find family by the join key
        const family = await Family.findOne({ familyJoinKey });

        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching family by join key', details: error.message });
    }
};


module.exports = {
    createFamily,
    getFamilyById,
    addFamilyMember,
    removeFamilyMember,
    addPatientToFamily,
    findFamilyByJoinKey,
    getAllFamilies
}