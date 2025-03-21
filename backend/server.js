// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express
const app = express();

// CORS setup (allowing frontend running on localhost:3000)
app.use(cors({
  origin: '*',  // Explicitly allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contact', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Create a schema and model for the Contact form
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Define API route to handle form submission
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, username, email, message } = req.body;
  
  const newContact = new Contact({
    firstName,
    lastName,
    username,
    email,
    message,
  });

  newContact.save()
    .then(() => res.json({ msg: 'Message saved successfully!' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Define API route to fetch all contacts (GET)
app.get('/api/contact', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))  // Send contacts as JSON
    .catch(err => res.status(500).json({ error: 'Error fetching contacts' }));
});

// Edit a contact by ID
app.put('/api/contact/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, email, message } = req.body;

  Contact.findByIdAndUpdate(id, { firstName, lastName, username, email, message }, { new: true })
    .then(updatedContact => res.json(updatedContact))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a contact by ID
app.delete('/api/contact/:id', (req, res) => {
  const { id } = req.params;

  Contact.findByIdAndDelete(id)
    .then(() => res.json({ message: 'Contact deleted successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
