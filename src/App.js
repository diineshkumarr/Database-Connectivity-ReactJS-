// src/App.js
import React from 'react';
import './App.css';
import ContactForm from './ContactForm';
// import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';  // Add these imports
import Output from './Output';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
      <Route path="/" element={<ContactForm />} />
      <Route path="/output" element={<Output />} />
    </Routes>
      </header>
    </div>
  );
}

export default App;
