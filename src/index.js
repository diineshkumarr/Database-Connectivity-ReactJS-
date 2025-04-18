import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root using React 18's new API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app wrapped with BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
