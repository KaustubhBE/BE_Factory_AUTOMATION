import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Maintenance from './Maintenance';
import Devices from './Devices';
import Settings from './Components/Settings';
import Login from './Login';
import Navbar from './Navbar';
import LoadingSpinner from './Components/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUser(user);
    setIsAuthenticated(true);
    navigate('/app');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const handleLinkClick = (path) => {
    setShowSplash(false);
    navigate(path);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      {loading && <LoadingSpinner />}
      {showSplash ? (
        <div className="splash-page">
          <h1>Welcome to Bajaj Earths</h1>
          <h3>Please choose an option below:</h3>
          <div className="navigation-links">
            <span onClick={() => handleLinkClick('/devices')} className="nav-link">Devices</span>
            <span onClick={() => handleLinkClick('/dashboard')} className="nav-link">Dashboard</span>
            <span onClick={() => handleLinkClick('/maintenance')} className="nav-link">Maintenance</span>
            <span onClick={() => handleLinkClick('/settings')} className="nav-link">Settings</span>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
        </Routes>
      )}
    </>
  );
}

export default App;