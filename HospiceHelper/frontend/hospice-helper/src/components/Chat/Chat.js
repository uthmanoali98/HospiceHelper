import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import History from '../History/History';

const Chat = () => {
    const [message, setMessage] = useState(''); // Stores the user input message
    const [chatHistory, setChatHistory] = useState([]); // Stores chat history (user + AI responses)
    const [chatList, setChatList] = useState([]); // Stores the list of chats (for history)


    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const res = await axios.get('/chats/USoG7PoIhX');
                setChatList(res.data);
                console.log(res.data); // Assuming res.data is a list of chats
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatList();
    }, []);

    useEffect(() => {
        const disclaimerMessage = {
            role: 'assistant',
            content: "Important Disclaimer: I am HospiceHelper, an AI assistant designed to provide information and support regarding hospice care. However, I am not a licensed medical professional and cannot provide medical diagnoses or treatment. For specific medical advice, please consult a healthcare provider. *Note* For the sake of the demo presentation you are added to a simulated family. The idea is that everyone is working together to take care of John Doe who is on hospice"
        };

        // Set the disclaimer as the first message if no chat history is present
        if (chatHistory.length === 0) {
            setChatHistory([disclaimerMessage]);
        }
    }, [chatHistory]);

    // Function to handle sending message
    const handleSendMessage = async () => {
        if (!message) return;

        // Append the user's message to the chat history
        const newChatHistory = [...chatHistory, { role: 'user', content: message }];
        setChatHistory(newChatHistory);

        try {
            // Send the message to the backend
            const res = await axios.post('/chat', {
                message: message,
                userId: 'USoG7PoIhX'
            });

            // Append the AI's response to the chat history
            setChatHistory([...newChatHistory, { role: 'assistant', content: res.data.reply }]);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        // Clear the input field after sending the message
        setMessage('');
    };

    // Function to handle Enter key press in the textarea
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Function to handle selecting a chat from the history
    const handleChatClick = (chat) => {
        // Assuming each message has a 'from' and 'message' field from MongoDB, transform to the needed structure
        const formattedMessages = chat.messages.map(msg => ({
            role: msg.from === 'HospiceHelper' ? 'assistant' : 'user',
            content: msg.message
        }));

        setChatHistory(formattedMessages); // Set the formatted chat's messages
    };

    return (
        <div className="chat-container">
            <div className="chat-section">
                <h2>Chat With Me</h2>
                <div className="chat-box">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`chat-message ${chat.role === 'user' ? 'user-message' : 'bot-message'}`}>
                            <p>{chat.content}</p>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        rows="2"
                    ></textarea>
                    <button className="icon-button" onClick={handleSendMessage}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
            {/* Pass chatList and handleChatClick to the History component */}
            <History chatList={chatList} onChatClick={handleChatClick} />
        </div>
    );
};

export default Chat;
