import React from 'react';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faCapsules, faFileMedical, faUsers, faFileContract } from '@fortawesome/free-solid-svg-icons';


const Navigation = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="sidebar">
            <h2>HospiceHelper</h2>
            <ul>
                <li className={activeTab === 'Chat' ? 'active' : ''}
                    onClick={() => setActiveTab('Chat')}>
                    <FontAwesomeIcon icon={faComments} /> Chat
                </li>
                <li className={activeTab === 'Medication' ? 'active' : ''}
                    onClick={() => setActiveTab('Medication')}>
                    <FontAwesomeIcon icon={faCapsules} /> Medication
                </li>
                <li className={activeTab === 'Generate Report' ? 'active' : ''}
                    onClick={() => setActiveTab('Generate Report')}>
                    <FontAwesomeIcon icon={faFileMedical} /> Generate Report
                </li>
                <li className={activeTab === 'Family Members' ? 'active' : ''}
                    onClick={() => setActiveTab('Family Members')}>
                    <FontAwesomeIcon icon={faUsers} /> Family Members
                </li>
                <li className={activeTab === 'Resources' ? 'active' : ''}
                    onClick={() => setActiveTab('Resources')}>
                    <FontAwesomeIcon icon={faFileContract} /> Resources
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;