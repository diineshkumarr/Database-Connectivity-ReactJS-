import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Output.css';

const Output = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [editingContact, setEditingContact] = useState(null); // Store the contact currently being edited

  useEffect(() => {
    // Fetch contacts from backend
    axios.get('https://database-conectivity.vercel.app/api/contact')
      .then(response => {
        setContacts(response.data);  // Save the contacts data to state
      })
      .catch(err => {
        console.error('Error fetching contacts:', err);
        setError('Error fetching contacts');
      });
  }, []);  // Empty dependency array ensures it runs once on component mount

  const handleEdit = (contact) => {
    // When the Edit button is clicked, set the contact for editing
    setEditingContact(contact);
  };

  const handleDelete = (id) => {
    // Handle delete operation
    axios.delete(`https://database-conectivity.vercel.app/api/contact/${id}`)
      .then(response => {
        setContacts(contacts.filter(contact => contact._id !== id)); // Remove the deleted contact from the state
        alert('Contact deleted successfully');
      })
      .catch(err => {
        console.error('Error deleting contact:', err);
        alert('Error deleting contact');
      });
  };

  const handleUpdate = () => {
    // Update the contact on the server
    axios.put(`https://database-conectivity.vercel.app/api/contact/${editingContact._id}`, editingContact)
      .then(response => {
        setContacts(contacts.map(contact => (contact._id === editingContact._id ? response.data : contact))); // Update the contact in state
        setEditingContact(null);  // Reset the editing form
        alert('Contact updated successfully');
      })
      .catch(err => {
        console.error('Error updating contact:', err);
        alert('Error updating contact');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingContact({ ...editingContact, [name]: value });
  };

  return (
    <div>
      <h1>Contacts</h1>

      {/* Display error message if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* If we are editing a contact, show the editing form */}
      {editingContact ? (
        <div>
          <h2>Edit Contact</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <input
              type="text"
              name="firstName"
              value={editingContact.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={editingContact.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="username"
              value={editingContact.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={editingContact.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <textarea
              name="message"
              value={editingContact.message}
              onChange={handleInputChange}
              placeholder="Message"
            />
            <button type="submit">Update Contact</button>
          </form>
        </div>
      ) : (
        // If not editing, show the contacts list
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id} className="list-data">
              <strong>{contact.firstName} {contact.lastName}</strong><br />
              <em>{contact.username}</em><br />
              <a className='email-form' href={`mailto:${contact.email}`}>{contact.email}</a><br />
              <p>{contact.message}</p>
              <button onClick={() => handleEdit(contact)}>Edit</button>
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Output;
