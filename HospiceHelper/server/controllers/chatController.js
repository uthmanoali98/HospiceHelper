const OpenAI = require("openai");
const Message = require('../models/Message');
const Chat = require('../models/Chat');
const mongoose = require('mongoose');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const findOrCreateChatForToday = async (userId) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let chat = await Chat.findOne({
        userId: userId,
        day: { $gte: startOfDay, $lt: endOfDay }
    });

    if (!chat) {
        chat = new Chat({
            userId: userId,
            day: startOfDay,
            messages: []
        });
        await chat.save();
    }

    return chat;
};

const addMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body;

        if (!from || !to || !message) {
            return res.status(400).json({ error: "All fields (from, to, message) are required" });
        }

        const newMessage = new Message({
            from,
            to,
            message,
            timestamp: new Date(),
            messageId: new mongoose.Types.ObjectId()
        });

        await newMessage.save();

        res.status(201).json({ message: "Message added successfully", data: newMessage });
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).json({ error: "Error adding message" });
    }
};

const chat = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userMessage = req.body.message;

        const previousMessages = await Message.find({ to: "HospiceHelper" }).limit(30).exec();

        const formattedPreviousMessages = previousMessages.map(msg => ({
            role: msg.from === "HospiceHelper" ? "assistant" : "user",
            content: `${msg.from}: ${msg.message}`
        }));

        const disclaimer = "Important Disclaimer: I am HospiceHelper, an AI assistant designed to provide information and support regarding hospice care. However, I am not a licensed medical professional and cannot provide medical diagnoses or treatment. For specific medical advice, please consult a healthcare provider.";

        const systemMessages = [
            { role: "system", content: "You are HospiceHelper, an AI assistant that offers compassionate support and guidance to individuals and families navigating hospice care. You provide helpful information about hospice services and care, but remind users that you're not a substitute for professional medical advice." },
            { role: "assistant", content: disclaimer }
        ];

        const messages = [
            ...systemMessages,
            ...formattedPreviousMessages,
            { role: "user", content: userMessage }
        ];

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const aiReply = chatCompletion.choices[0].message.content;

        const chat = await findOrCreateChatForToday(userId);

        const userMessageEntry = new Message({
            from: userId,
            to: "HospiceHelper",
            message: userMessage,
            messageId: new mongoose.Types.ObjectId()
        });

        await userMessageEntry.save();

        chat.messages.push(userMessageEntry._id);
        await chat.save();

        const aiMessageEntry = new Message({
            from: "HospiceHelper",
            to: userId,
            message: aiReply,
            messageId: new mongoose.Types.ObjectId()
        });
        await aiMessageEntry.save();

        chat.messages.push(aiMessageEntry._id);
        await chat.save();

        res.json({ reply: aiReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred during the chat completion.");
    }
};

const getAllChats = async (req, res) => {
    try {
        const userId = req.params.userId;

        const chats = await Chat.find({ userId })
            .populate('messages')
            .exec();

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: 'No chats found for this user.' });
        }

        const chatList = chats.map(chat => ({
            day: chat.day,
            messages: chat.messages,
            preview: chat.messages.length > 0 ? chat.messages[0].message : "No messages",
            title: `Chat on ${chat.day.toDateString()}`,
        }));

        res.json(chatList);
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).send("An error occurred while fetching the chat history.");
    }
};

module.exports = {
    chat,
    getAllChats,
    addMessage
};
