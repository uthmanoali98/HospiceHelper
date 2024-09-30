import React from 'react';
import './ChatItem.css';

const ChatItem = ({ title, summary, checked, onChange, className }) => {
    return (
        <div className={`${className} report-chat-item`}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <div className="chat-content">
                <h3>{title}</h3>
                <p>{summary}</p>
            </div>
        </div>
    );
};

export default ChatItem;
