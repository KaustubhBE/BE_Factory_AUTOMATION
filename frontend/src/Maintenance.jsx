import React, { useState, useEffect } from 'react';
import './Maintenance.css';
import { getDevicesBySection, checklistItems } from './services/maintenceCheckList';

const Maintenance = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [failureReason, setFailureReason] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [sections, setSections] = useState({});
  const [checklistState, setChecklistState] = useState({});

  useEffect(() => {
    const sectionData = getDevicesBySection();
    setSections(sectionData);
  }, []);

  const handleSectionChange = (e) => {
    const section = e.target.value;
    setSelectedSection(section);
    setSelectedMachine('');
    if (section) {
      setChecklistState(
        Object.keys(checklistItems[section]).reduce((acc, item) => {
          acc[item] = false;
          return acc;
        }, {})
      );
    }
  };

  const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  const handleChecklistChange = (item) => {
    setChecklistState(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({
      section: selectedSection,
      machineId: selectedMachine,
      failureReason,
      estimatedTime,
      checklistStatus: checklistState
    });
  };

  return (
    <div className="maintenance-container">
      <div className="maintenance-header">
        <h1>Maintenance Report</h1>
        <p>Record machine failures and complete maintenance checklist</p>
      </div>

      <form className="maintenance-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Failure Report</h2>
          <div className="form-group">
            <label htmlFor="section">Select Section</label>
            <select 
              id="section" 
              value={selectedSection} 
              onChange={handleSectionChange}
              required
            >
              <option value="">Select a section</option>
              {Object.keys(sections).map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          {selectedSection && (
            <div className="form-group">
              <label htmlFor="machine">Select Machine</label>
              <select 
                id="machine" 
                value={selectedMachine} 
                onChange={handleMachineChange}
                required
              >
                <option value="">Select a machine</option>
                {sections[selectedSection]?.map(machine => (
                  <option 
                    key={machine.id} 
                    value={machine.id}
                    disabled={!machine.isOperational}
                  >
                    Machine {machine.id} ({machine.status.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="reason">Failure Reason</label>
            <textarea
              id="reason"
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value)}
              placeholder="Describe the reason for machine failure..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="etr">Estimated Time to Repair (Hours)</label>
            <input
              type="number"
              id="etr"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              min="0"
              step="0.5"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Maintenance Checklist</h2>
          {selectedSection ? (
            <div className="checklist">
              {Object.entries(checklistState).map(([item, checked]) => (
                <div key={item} className="checklist-item">
                  <input
                    type="checkbox"
                    id={item}
                    checked={checked}
                    onChange={() => handleChecklistChange(item)}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          ) : (
            <p>Please select a section to view its maintenance checklist</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Maintenance;
