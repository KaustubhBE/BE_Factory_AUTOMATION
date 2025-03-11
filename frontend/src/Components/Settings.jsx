import React from 'react';
import { useAuth } from './AuthContext';

function Settings({ onLogout }) {
  const { user, isLogoutEnabled } = useAuth();

  if (!user) {
    return (
      <div className="settings-container">
        <style>
          {`
            .settings-container {
              max-width: 600px;
              margin-top: 500px;
              margin-left: auto;
              margin-right: auto;
              padding: 2rem;
              border: 1px solid #ccc;
              border-radius: 10px;
              background-color: white;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              box-sizing: border-box;
              position: relative;
              z-index: 1;
            }
          `}
        </style>
        <p>Please log in to view settings.</p>
      </div>
    );
  }

  const handleLogout = () => {
    if (isLogoutEnabled && onLogout) {
      onLogout();
    }
  };

  return (
    <div className="settings-container">
      <style>
        {`
          .settings-container {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            padding: 2rem;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            position: relative;
            z-index: 1;
          }

          .settings-container h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e6cfb8;
          }

          .user-info {
            margin-bottom: 2rem;
          }

          .user-info p {
            font-size: 1rem;
            color: #333;
            padding: 0.5rem;
            margin: 0.5rem 0;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }

          .user-info p:hover {
            background-color: rgba(230, 207, 184, 0.1);
          }

          .logout-button {
            width: 100%;
            padding: 1rem;
            background-color: #987349;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            opacity: ${isLogoutEnabled ? '1' : '0.5'};
          }

          .logout-button:hover {
            background-color: ${isLogoutEnabled ? '#7d5f3c' : '#987349'};
            transform: ${isLogoutEnabled ? 'translateY(-2px)' : 'none'};
            box-shadow: ${isLogoutEnabled ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none'};
          }

          .logout-button:disabled {
            cursor: not-allowed;
          }

          @media screen and (max-height: 850px) {
            .settings-container {
              margin-top: 400px;
            }
          }

          @media screen and (max-width: 768px) {
            .settings-container {
              margin: 350px 1rem 2rem 1rem;
              padding: 1.5rem;
            }
          }
        `}
      </style>
      <h2>Settings</h2>
      <div className="user-info">
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <button 
        className="logout-button" 
        onClick={handleLogout}
        disabled={!isLogoutEnabled}
      >
        {isLogoutEnabled ? 'Logout' : 'Logout Disabled'}
      </button>
    </div>
  );
}

export default Settings;