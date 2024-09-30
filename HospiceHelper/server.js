const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const FamilyController = require('./controllers/familyController')
const UserController = require('./controllers/userController')
const PatientController = require('./controllers/patientController')
const { chat, getAllChats, addMessage } = require('./controllers/chatController');
const { generateReport } = require('./controllers/reportController')
const { addMedication, getMedicationsByPatientId } = require('./controllers/medicationController')
const { createFamilyMember, getAllFamilyMembers } = require('./controllers/familyMembersController')

require('dotenv').config();


const app = express();
const PORT = 9001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_DB_KEY;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Connection to MongoDB
async function connectDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, clientOptions);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}

mongoose.set('strictPopulate', false);

// Middleware to ensure MongoDB is connected
function ensureConnected(req, res, next) {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ error: 'Database connection not available. Please try again later.' });
    }
    next();
}

connectDB(); // Connect to the database when the server starts

// Use the middleware for all routes
app.use(ensureConnected);


app.get('/user/all', UserController.getAllUsers);

app.post('/patient/new', PatientController.createPatient);

// Sample route
app.post('/user/new', UserController.createUser);

app.post('/chat', chat);

app.get('/chats/:userId', getAllChats);

app.post('/generate-report', generateReport);

app.post('/add-medication', addMedication);

app.get('/medications/:patientId', getMedicationsByPatientId);

app.post('/family-members/new', createFamilyMember);

app.get('/family-members', getAllFamilyMembers);

app.post('/add-message', addMessage);





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));