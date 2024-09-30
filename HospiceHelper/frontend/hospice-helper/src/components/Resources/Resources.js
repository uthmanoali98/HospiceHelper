import React from 'react';
import './Resources.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faBookOpen, faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';

const Resources = () => {
    return (
        <div className="resources-container">
            <h1 className="resources-title">Family Resources</h1>
            <div className="resource-section">
                <FontAwesomeIcon icon={faBrain} size="2x" className="icon" />
                <h2>Mental Health Resources</h2>
                <p>Find information and support for mental health issues including guides and contact information for local therapists and support groups.</p>
            </div>
            <div className="resource-section">
                <FontAwesomeIcon icon={faBookOpen} size="2x" className="icon" />
                <h2>Estate Planning</h2>
                <p>Access resources to help with estate planning, including legal assistance and how to prepare wills and trusts.</p>
            </div>
            <div className="resource-section">
                <FontAwesomeIcon icon={faHospitalSymbol} size="2x" className="icon" />
                <h2>Local Hospital Information</h2>
                <p>Comprehensive list of local hospitals and emergency rooms including contact details and directions.</p>
            </div>
        </div>
    );
};

export default Resources;
