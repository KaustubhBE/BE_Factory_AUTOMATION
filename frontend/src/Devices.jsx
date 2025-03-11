import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import devicesList from './services/devicesList';
import './Devices.css';

const Devices = () => {
  const location = useLocation();
  const [filteredSections, setFilteredSections] = useState({});
  const isSectionSpecific = !!location.state?.selectedSection;
  
  useEffect(() => {
    // Group devices by section
    const sectionDevices = devicesList.reduce((acc, device) => {
      if (!acc[device.sectionName]) {
        acc[device.sectionName] = [];
      }
      acc[device.sectionName].push(device);
      return acc;
    }, {});

    // If a section was selected from dashboard, only show that section
    if (location.state?.selectedSection) {
      const selectedSection = location.state.selectedSection;
      setFilteredSections({
        [selectedSection]: sectionDevices[selectedSection]
      });
    } else {
      setFilteredSections(sectionDevices);
    }
  }, [location.state]);

  return (
    <div className={`devices ${isSectionSpecific ? 'section-specific' : ''}`}>
      {Object.entries(filteredSections).map(([sectionName, devices]) => (
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
