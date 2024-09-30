const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema({
    day: {
        type: Date, // The specific day the chat occurred
    },
    userId: {
        type: String, // Reference the `userId` field from the User schema
        ref: 'User', // Establish the reference to the User schema
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message', // Reference to the Message model
    }],
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;