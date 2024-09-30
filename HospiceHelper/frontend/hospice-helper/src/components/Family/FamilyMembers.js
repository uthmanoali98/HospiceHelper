import React, { useState, useEffect } from 'react';
import './FamilyMembers.css';
import axios from 'axios';

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, member = {} }) => {
    if (!isOpen) return null;

    // Submit handler that passes the form data back to the parent component
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(e.target); // Get form data
        const newMemberData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            relationship: formData.get('relationship'),
            dob: formData.get('dob'),
            contact: formData.get('contact'),
            notes: formData.get('notes')
        };
        onSubmit(newMemberData); // Pass the new member data back to parent component
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            defaultValue={member.firstName || ''}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={member.lastName || ''}
                            required
                        />
                    </label>
                    <label>
                        Relationship:
                        <input
                            type="text"
                            name="relationship"
                            defaultValue={member.relationship || ''}
                            required
                        />
                    </label>
                    <label>
                        Birthday:
                        <input
                            type="date"
                            name="dob"
                            defaultValue={member.dob || ''}
                            required
                        />
                    </label>
                    <label>
                        Contact Info:
                        <input
                            type="text"
                            name="contact"
                            defaultValue={member.contact || ''}
                            required
                        />
                    </label>
                    <label>
                        Notes:
                        <textarea name="notes" defaultValue={member.notes || ''} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

const FamilyMembers = () => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchFamilyMembers = async () => {
            try {
                const res = await axios.get('/family-members');
                setFamilyMembers(res.data); // Set family members in state
            } catch (error) {
                console.error('Error fetching family members:', error);
            }
        };

        fetchFamilyMembers();
    }, []);

    // Handle form submission for adding or updating a family member
    const handleAddOrUpdateFamilyMember = async (memberData) => {
        if (isEditing) {
            // Update existing member
            try {
                const res = await axios.put(`/family-members/${selectedMember._id}`, memberData);
                const updatedMembers = familyMembers.map(member =>
                    member._id === res.data._id ? res.data : member
                );
                setFamilyMembers(updatedMembers);
            } catch (error) {
                console.error('Error updating family member:', error);
            }
        } else {
            // Add new member
            try {
                const res = await axios.post('/family-members/new', memberData);
                setFamilyMembers([...familyMembers, res.data]);
            } catch (error) {
                console.error('Error adding family member:', error);
            }
        }

        setSelectedMember(null);
        setModalOpen(false);
    };

    return (
        <div className="family-members-container">
            <h1>Family Members</h1>
            <button
                className="add-member-btn"
                onClick={() => {
                    setSelectedMember({
                        firstName: '',
                        lastName: '',
                        relationship: '',
                        dob: '',
                        contact: '',
                        notes: ''
                    });
                    setIsEditing(false);
                    setModalOpen(true);
                }}
            >
                Add Family Member
            </button>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddOrUpdateFamilyMember}
                member={selectedMember}
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Relationship</th>
                        <th>Birthday</th>
                        <th>Contact Info</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {familyMembers.map(member => (
                        <tr key={member._id} onClick={() => {
                            setSelectedMember(member);
                            setIsEditing(true);
                            setModalOpen(true);
                        }}>
                            <td>{`${member.firstName} ${member.lastName}`}</td>
                            <td>{member.relationship}</td>
                            <td>{member.dob}</td>
                            <td>{member.contact}</td>
                            <td>{member.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FamilyMembers;

