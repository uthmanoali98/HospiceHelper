const FamilyMember = require('../models/FamilyMember');

// Method to get all family members
const getAllFamilyMembers = async (req, res) => {
    try {
        const familyMembers = await FamilyMember.find();
        res.status(200).json(familyMembers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching family members', details: error.message });
    }
};

// Method to create a new family member
const createFamilyMember = async (req, res) => {
    try {
        const { firstName, lastName, relationship, dob, notes } = req.body;

        if (!firstName || !lastName || !relationship || !dob) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newFamilyMember = new FamilyMember({
            firstName,
            lastName,
            relationship,
            dob,
            notes
        });

        await newFamilyMember.save();
        res.status(201).json(newFamilyMember);
    } catch (error) {
        res.status(500).json({ error: 'Error creating family member', details: error.message });
    }
};

// Method to update a family member
const updateFamilyMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, relationship, dob, notes } = req.body;

        const familyMember = await FamilyMember.findById(id);
        if (!familyMember) {
            return res.status(404).json({ error: 'Family member not found' });
        }

        familyMember.firstName = firstName || familyMember.firstName;
        familyMember.lastName = lastName || familyMember.lastName;
        familyMember.relationship = relationship || familyMember.relationship;
        familyMember.dob = dob || familyMember.dob;
        familyMember.notes = notes || familyMember.notes;

        await familyMember.save();
        res.status(200).json(familyMember);
    } catch (error) {
        res.status(500).json({ error: 'Error updating family member', details: error.message });
    }
};

module.exports = {
    getAllFamilyMembers,
    createFamilyMember,
    updateFamilyMember
};
