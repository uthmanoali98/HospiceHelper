import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Medication from './components/Medication/Medication';
import Chat from './components/Chat/Chat';
import Resources from './components/Resources/Resources';
import Report from './components/Report/Report';
import FamilyMembers from './components/Family/FamilyMembers';


const App = () => {
  const [activeTab, setActiveTab] = useState('Chat'); // Default active tab

  return (
    <div className="app-container">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Chat' && <Chat />}
      {activeTab === 'Medication' && <Medication />}
      {activeTab === 'Resources' && <Resources />}
      {activeTab === 'Generate Report' && <Report />}
      {activeTab === 'Family Members' && <FamilyMembers />}
    </div>
  );
};

export default App;