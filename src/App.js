import React from 'react';
import './App.css';
import Home from './components/Home';
import PatientLogin from './components/PatientLogin';
import TherapistLogin from './components/TherapistLogin';
import PatientDashboard from './components/PatientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import PatientReports from './components/PatientReports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.min.css';
import { toast, ToastContainer } from 'react-toastify';



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
          <Route path="/patient-reports/:patientId" element={<PatientReports/>} />
          
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
