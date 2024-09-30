import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse, faChalkboardTeacher, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import axios from '../../axios';
import ChatItem from '../ChatItem/ChatItem';
import './Report.css';

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'white',
        borderColor: '#ccc',
        fontSize: '1em'
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'grey',
        padding: 10,
        display: 'flex',
        alignItems: 'center'
    })
};

const options = [
    { value: 'nurse', label: (<div><FontAwesomeIcon icon={faUserNurse} /> Nurse</div>), icon: faUserNurse },
    { value: 'teacher', label: (<div><FontAwesomeIcon icon={faChalkboardTeacher} /> Teacher</div>), icon: faChalkboardTeacher },
    { value: 'manager', label: (<div><FontAwesomeIcon icon={faBriefcase} /> Manager</div>), icon: faBriefcase }
];

const Report = () => {
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [purpose, setPurpose] = useState('');
    const [tone, setTone] = useState('formal');
    const [chats, setChats] = useState([]);
    const [generatedReport, setGeneratedReport] = useState('');

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get('/chats/USoG7PoIhX');
                setChats(res.data.map(chat => ({
                    id: chat._id,
                    title: `Chat on ${new Date(chat.day).toDateString()}`,
                    summary: chat.messages[0]?.message || 'No messages',
                    checked: false
                })));
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };
        fetchChats();
    }, []);

    const handleGenerateReport = async () => {
        const selectedChats = chats.filter(chat => chat.checked);
        if (!selectedRecipient || !purpose || selectedChats.length === 0) {
            alert("Please fill out all fields and select at least one chat.");
            return;
        }

        const reportData = {
            chats: selectedChats,
            recipient: selectedRecipient.value,
            purpose,
            tone
        };

        try {
            const response = await axios.post('/generate-report', reportData);
            setGeneratedReport(formatReport(response.data.report));
        } catch (error) {
            console.error("Error generating report:", error);
        }
    };

    // Function to format the report for better readability
    const formatReport = (report) => {
        return report
            .replace(/\[Insert Date\]/g, new Date().toLocaleDateString()) // Format the date
            .replace(/\n/g, '<br/>') // Convert newlines to HTML line breaks
            .replace(/\[.*?\]/g, '____'); // Replace any remaining placeholders with underscores
    };

    const toggleChatSelection = (id) => {
        setChats(chats.map(chat => chat.id === id ? { ...chat, checked: !chat.checked } : chat));
    };

    return (
        <div className="report-container">
            <h1 className="report-title">Generate Report</h1>
            <div className="report-sections">
                <div className="select-chats">
                    <h2>Select Chats</h2>
                    {chats.map(chat => (
                        <ChatItem
                            key={chat.id}
                            title={chat.title}
                            summary={chat.summary}
                            checked={chat.checked}
                            onChange={() => toggleChatSelection(chat.id)}
                            className="report-specific-chat-item"
                        />
                    ))}
                </div>
                <div className="report-details">
                    <div className="recipient-selection">
                        <h2>Select Recipient</h2>
                        <Select
                            options={options}
                            styles={customStyles}
                            placeholder="Choose a recipient..."
                            onChange={(value) => setSelectedRecipient(value)}
                        />
                    </div>
                    <div className="report-purpose">
                        <h2>What's the report for?</h2>
                        <textarea
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            placeholder="Describe the purpose..."
                        ></textarea>
                    </div>
                    <div className="tone-selection">
                        <h2>Select Tone</h2>
                        <label><input type="radio" name="tone" value="formal" checked={tone === 'formal'} onChange={() => setTone('formal')} /> Formal</label>
                        <label><input type="radio" name="tone" value="informal" checked={tone === 'informal'} onChange={() => setTone('informal')} /> Informal</label>
                        <label><input type="radio" name="tone" value="persuasive" checked={tone === 'persuasive'} onChange={() => setTone('persuasive')} /> Persuasive</label>
                    </div>
                </div>
            </div>
            <button className="generate-report-btn" onClick={handleGenerateReport}>Generate Report</button>
            <div className="report-preview">
                <h2>Read your Report</h2>
                <div dangerouslySetInnerHTML={{ __html: generatedReport || "Your generated report will appear here..." }} />
                {generatedReport && <button className="save-report-btn">Save Your Report</button>}
            </div>
        </div>
    );
};

export default Report;
