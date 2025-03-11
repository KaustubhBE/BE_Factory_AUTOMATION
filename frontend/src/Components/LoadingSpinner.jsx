import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <style>
        {`
          .loading-spinner {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .spinner {
            border: 8px solid #e6cfb8;
            border-top: 8px solid #987349;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
