import './Medication.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCapsules, faPlus } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, onSubmit, medication = {} }) => {
    // Default medication to an empty object or fallback to empty strings
    const { medicationName = '', type = '', dosage = '', frequency = '', provider = '', notes = '' } = medication || {};

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newMedication = {
                        medicationName: formData.get("name"),
                        type: formData.get("type"),
                        dosage: formData.get("dosage"),
                        frequency: formData.get("frequency"),
                        provider: formData.get("provider")
                    };
                    onSubmit(newMedication);
                }}>
                    <label>
                        Medication Name:
                        <input type="text" name="name" required defaultValue={medicationName} />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="type" required defaultValue={type} />
                    </label>
                    <label>
                        Dosage:
                        <input type="text" name="dosage" required defaultValue={dosage} />
                    </label>
                    <label>
                        Frequency:
                        <input type="text" name="frequency" required defaultValue={frequency} />
                    </label>
                    <label>
                        Provider:
                        <input type="text" name="provider" required defaultValue={provider} />
                    </label>
                    {notes && (
                        <>
                            <label className="fast-facts-label">Hospice Helper Fast Facts:</label>
                            <textarea className="fast-facts-content" value={notes} readOnly />
                        </>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

const Medication = ({ patientId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null); // Store selected medication for view
    const [medications, setMedications] = useState([]);

    // Fetch medications for the specific patientId
    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const res = await axios.get(`/medications/PAnszXeXwD`);
                setMedications(res.data);
            } catch (error) {
                console.error("Error fetching medications:", error);
            }
        };
        fetchMedications();
    }, [patientId]);

    // Handle adding medication
    const handleAddMedication = async (medicationData) => {
        try {
            const res = await axios.post('/add-medication', {
                ...medicationData,
                patientId: 'PAnszXeXwD',
            });
            setMedications([...medications, res.data.medication]); // Add new medication to the table
            setModalOpen(false);
        } catch (error) {
            console.error("Error adding medication:", error);
        }
    };

    // Handle row click to show details
    const handleRowClick = (medication) => {
        setSelectedMedication(medication); // Open modal with selected medication details
        setModalOpen(true);
    };

    return (
        <div className="medication-container">
            <div className="medication-header">
                <h1>Medication</h1>
                <button className="add-medication-button" onClick={() => { setSelectedMedication(null); setModalOpen(true); }}>
                    <FontAwesomeIcon icon={faPlus} /> Add Medication
                </button>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddMedication}
                medication={selectedMedication}
            />
            <div className="medication-stats">
                <FontAwesomeIcon icon={faCapsules} className="medicine-icon" />
                <span>{medications.length} Medications</span>
            </div>
            <table className="medication-table">
                <thead>
                    <tr>
                        <th>Medication Name</th>
                        <th>Type</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Provider</th>
                    </tr>
                </thead>
                <tbody>
                    {medications.map((medication) => (
                        <tr key={medication._id} onClick={() => handleRowClick(medication)}>
                            <td>{medication.medicationName}</td>
                            <td>{medication.type}</td>
                            <td>{medication.dosage}</td>
                            <td>{medication.frequency}</td>
                            <td>{medication.provider}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Medication;
