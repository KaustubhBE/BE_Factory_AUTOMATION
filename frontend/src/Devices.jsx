import React from 'react';
import devicesList from './services/devicesList';
import './Devices.css';

const Devices = () => {
  // Group devices by section
  const sectionDevices = devicesList.reduce((acc, device) => {
    if (!acc[device.sectionName]) {
      acc[device.sectionName] = [];
    }
    acc[device.sectionName].push(device);
    return acc;
  }, {});

  return (
    <div className="devices">
      {Object.entries(sectionDevices).map(([sectionName, devices]) => (
        <div key={sectionName} className="section-container">
          <h2 className="section-title">{sectionName}</h2>
          <div className="devices-grid">
            {devices.map((device) => (
              <div
                key={device.id}
                className={`device-card ${device.status === 'on' ? 'status-on' : 'status-off'}`}
              >
                <h3>Device {device.id}</h3>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span className="status-text">
                    {device.status === 'on' ? 'Operational' : 'Maintenance'}
                  </span>
                </div>
                <div className="device-stats">
                  <p>Daily Hours: {device.shiftStatus.daily.hours}h</p>
                  <p>Weekly Hours: {device.shiftStatus.weekly.hours}h</p>
                  <p>Monthly Hours: {device.shiftStatus.monthly.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Devices;
