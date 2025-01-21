import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WelcomePage from './components/WelcomePage';
import Community from './components/Community';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import CalorieTracker from './components/CalorieTracker';
import ReminderSystem from './components/ReminderSystem';
import PortionEstimator from './components/PortionEstimator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-20 md:ml-64"> {/* Adjusted margin to match sidebar width */}
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/nutrition" element={<CalorieTracker />} />
            <Route path="/reminders" element={<ReminderSystem />} />
            <Route path="/portion-estimator" element={<PortionEstimator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;