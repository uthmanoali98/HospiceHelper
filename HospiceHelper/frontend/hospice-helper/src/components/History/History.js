import React from 'react';
import './History.css';

const History = ({ chatList = [], onChatClick }) => {
    // Check if chatList is an array, otherwise set it to an empty array
    const validChatList = Array.isArray(chatList) ? chatList : [];

    return (
        <div className="history-section">
            <h2>History</h2>
            <div className="chat-history">
                {validChatList.length > 0 ? (
                    validChatList.map((chat, index) => (
                        <div
                            key={index}
                            className="chat-item"
                            onClick={() => onChatClick(chat)} // Pass the clicked chat data
                        >
                            <h3>{chat.title}</h3>
                            <p>{chat.preview}</p>
                        </div>
                    ))
                ) : (
                    <p>No chat history available.</p>
                )}
            </div>
        </div>
    );
};

export default History;

