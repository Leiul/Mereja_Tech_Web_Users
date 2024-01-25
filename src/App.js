import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Register from './components/Registor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginAfterRegistration';

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navbar" element={<Navbar />} />
          

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;