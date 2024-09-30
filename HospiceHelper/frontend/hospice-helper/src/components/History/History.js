import React from 'react';
import './History.css';

const History = ({ chatList, onChatClick }) => {
    return (
        <div className="history-section">
            <h2>History</h2>
            <div className="chat-history">
                {chatList.map((chat, index) => (
                    <div
                        key={index}
                        className="chat-item"
                        onClick={() => onChatClick(chat)} // Pass the clicked chat data
                    >
                        <h3>{chat.title}</h3>
                        <p>{chat.preview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
