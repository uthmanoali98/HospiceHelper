const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateReport = async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { chats, recipient, purpose, tone } = req.body;

        // Prepare a prompt for the OpenAI API
        const prompt = `
            You are a helpful assistant generating a report for a ${recipient}.
            The purpose of the report is: ${purpose}.
            The tone of the report should be ${tone}.
            Here are the selected chats for reference:
            ${chats.map(chat => `- ${chat.title}: ${chat.summary}`).join('\n')}

            Based on this, please generate a detailed report that summarizes the key points, addresses the recipient properly, and aligns with the provided tone. 
        `;

        // Send the request to OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant generating medical reports." },
                { role: "user", content: prompt }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        // Extract the AI's generated report
        const aiGeneratedReport = response.choices[0].message.content;

        // Send the generated report back to the frontend
        res.status(200).json({ report: aiGeneratedReport });
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ error: 'An error occurred while generating the report.' });
    }
};

module.exports = {
    generateReport,
};
