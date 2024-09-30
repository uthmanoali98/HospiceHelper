const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

// Route to create a new family
router.post('/', familyController.createFamily);

// Route to get a family by ID
router.get('/:id', familyController.getFamilyById);

// Route to add a member to a family
router.post('/addMember', familyController.addFamilyMember);

// Route to remove a member from a family
router.post('/removeMember', familyController.removeFamilyMember);

// Route to add a patient to a family
router.post('/addPatient', familyController.addPatientToFamily);

// Route to find a family by the join key
router.get('/join/:familyJoinKey', familyController.findFamilyByJoinKey);

module.exports = router;