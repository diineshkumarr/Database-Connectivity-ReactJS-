import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    message: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to the backend API to save the contact message
      const response = await axios.post('${process.env.REACT_APP_API_URL}/api/contact', formData);
      
      
      if (response.status === 200) {
        alert('Message sent successfully!');

        // Clear form data after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          message: '',
        });

        // Redirect to the Output page after successful form submission
        navigate('/output'); // Redirect to '/output' route
      }
    } catch (error) {
      console.error('There was an error sending the message!', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        {/* First Row: First Name and Last Name */}
        <div className="form-row">
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Second Row: Username */}
        <div className="form-row">
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Third Row: Email */}
        <div className="form-row">
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Fourth Row: Message */}
        <div className="form-row">
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
