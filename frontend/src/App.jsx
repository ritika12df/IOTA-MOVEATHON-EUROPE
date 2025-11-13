// src/App.jsx
// Main App component with routing

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterProduct from './components/RegisterProduct';
import VerifyProduct from './components/VerifyProduct';
import UpdateJourney from './components/UpdateJourney';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-emoji">🌍</span>
              <h1>TrackIT</h1>
              <span className="logo-tagline">Transparent Product Journey on IOTA</span>
            </Link>

            <nav className="nav-menu">
              <Link to="/" className="nav-link">Register Product</Link>
              <Link to="/verify" className="nav-link">Verify Product</Link>
              <Link to="/update" className="nav-link">Update Journey</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<RegisterProduct />} />
            <Route path="/verify" element={<VerifyProduct />} />
            <Route path="/verify/:productId" element={<VerifyProduct />} />
            <Route path="/update" element={<UpdateJourney />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>🔗 Built on IOTA Blockchain for Supply Chain Transparency</p>
          <p className="footer-note">All product journeys are immutably recorded on the IOTA Tangle</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
