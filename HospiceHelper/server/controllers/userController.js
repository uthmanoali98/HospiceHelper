const User = require('../models/User');
const Family = require('../models/Family');
const KeyGenerator = require('../util/KeyGenerator');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, dob, familyId } = req.body;

        console.log('Creating new user')
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'Full name, first name, and last name are required' });
        }

        const fullName = `${firstName} ${lastName}`
        const userId = await KeyGenerator.generateSchemaId('User', User)
        console.log(userId)

        const newUser = new User({
            fullName,
            firstName,
            lastName,
            dob,
            family: familyId,
            userId
        });

        if (familyId) {
            const family = await Family.findById(familyId);
            if (!family) {
                return res.status(404).json({ error: 'Family not found' });
            }
        }

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('family');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('family');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user', details: error.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const { fullName, firstName, lastName, dob, familyId } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (familyId) {
            const family = await Family.findById(familyId);
            if (!family) {
                return res.status(404).json({ error: 'Family not found' });
            }
            user.family = familyId;
        }

        user.fullName = fullName || user.fullName;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.dob = dob || user.dob;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
};

// Assign a user to a family
const assignUserToFamily = async (req, res) => {
    try {
        const { userId, familyId } = req.body;

        if (!userId || !familyId) {
            return res.status(400).json({ error: 'User ID and family ID are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }

        user.family = familyId;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error assigning user to family', details: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    assignUserToFamily
};
