import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import devicesList from './services/devicesList';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const navigate = useNavigate();

  // Prepare data for the charts
  const sectionData = devicesList.reduce((acc, device) => {
    const section = acc.find(sec => sec.name === device.sectionName);
    if (section) {
      section.devices.push(device);
    } else {
      acc.push({
        name: device.sectionName,
        devices: [device]
      });
    }
    return acc;
  }, []);

  const handleSectionClick = (sectionName) => {
    navigate('/devices', { state: { selectedSection: sectionName } });
  };

  return (
    <div className="dashboard">
      {sectionData.map((section, index) => {
        const pieData = [
          { name: 'Operational', value: section.devices.filter(device => device.status === 'on').length },
          { name: 'Maintenance', value: section.devices.filter(device => device.status === 'off').length }
        ];

        const totalDevices = section.devices.length;
        const avgDailyHours = section.devices.reduce((sum, device) => sum + device.shiftStatus.daily.hours, 0) / totalDevices;
        const avgWeeklyHours = section.devices.reduce((sum, device) => sum + device.shiftStatus.weekly.hours, 0) / totalDevices;
        const avgMonthlyHours = section.devices.reduce((sum, device) => sum + device.shiftStatus.monthly.hours, 0) / totalDevices;

        const barData = [
          { name: 'Daily', hours: avgDailyHours },
          { name: 'Weekly', hours: avgWeeklyHours },
          { name: 'Monthly', hours: avgMonthlyHours }
        ];

        return (
          <div 
            key={index} 
            className="section-card"
            onClick={() => handleSectionClick(section.name)}
          >
            <h2>{section.name}</h2>
            <div className="charts">
              <PieChart width={200} height={200}>
                <Pie
                  data={pieData}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              <BarChart width={400} height={200} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </div>
            <ul>
              <li><strong>Average Daily Hours:</strong> {avgDailyHours.toFixed(2)} hrs</li>
              <li><strong>Average Weekly Hours:</strong> {avgWeeklyHours.toFixed(2)} hrs</li>
              <li><strong>Average Monthly Hours:</strong> {avgMonthlyHours.toFixed(2)} hrs</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;