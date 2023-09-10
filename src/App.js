import React from 'react';
import './App.css';
import Home from './components/Home';
import PatientLogin from './components/PatientLogin';
import TherapistLogin from './components/TherapistLogin';
import PatientDashboard from './components/PatientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/therapist-login" element={<TherapistLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
