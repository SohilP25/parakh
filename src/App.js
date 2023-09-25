import React  from 'react';
import {  Routes,Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import './App.css';
import Question from './Pages/Question.jsx'
import Result from './Pages/Result.jsx';
import Chart from 'chart.js/auto'; // Import the Chart.js library

// Initialize Chart.js and register the 'doughnut' chart type
// Chart.register(Chart.controllers.doughnut);

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/question" element={<Question />} />
          <Route path="/result" element={<Result />} />
       </Routes>
    </>
  );
}

export default App;
