import devicesList from './devicesList';

// Group devices by section
export const getDevicesBySection = () => {
  const sections = {};
  
  devicesList.forEach(device => {
    if (!sections[device.sectionName]) {
      sections[device.sectionName] = [];
    }
    sections[device.sectionName].push({
      id: device.id,
      status: device.status,
      isOperational: device.shiftStatus.daily.status === 'operational'
    });
  });

  return sections;
};

// Maintenance checklist items by machine type
export const checklistItems = {
  'Section A': {
    'Oil Level Check': false,
    'Belt Tension': false,
    'Bearing Temperature': false,
    'Vibration Check': false,
    'Lubrication': false,
    'Motor Alignment': false,
    'Safety Guards Check': false
  },
  'Section B': {
    'Motor Inspection': false,
    'Cooling System': false,
    'Control Panel Check': false,
    'Safety Guards': false,
    'Emergency Stop Test': false,
    'Electrical Connections': false,
    'Temperature Monitoring': false
  },
  'Section C': {
    'Sensor Calibration': false,
    'Filter Cleaning': false,
    'Pressure Check': false,
    'Alignment Check': false,
    'Wear and Tear Inspection': false,
    'Hydraulic System Check': false,
    'Safety Valve Test': false
  }
};
