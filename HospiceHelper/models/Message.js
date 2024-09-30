const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    from: {
        type: String, // Can be changed to a reference if necessary, e.g., to a User model
    },
    to: {
        type: String, // Can be changed to a reference if necessary
    },
    message: {
        type: String,
    },
    messageId: {
        type: String, // You can generate this manually or let MongoDB's ObjectId act as an ID
    },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
