import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Charts = ({ totalQuestions, rightQuestions,totalLabel,rightLabel }) => {
  const chartData = {
    labels: [totalLabel, rightLabel],
    datasets: [
      {
        data: [totalQuestions, rightQuestions], // Replace with your actual values
        backgroundColor: ['#1c292f', '#6bde3b'], // Colors for the segments
      },
    ],
  }; 
  const chartOptions = {
    rotation: 135,
  };

  return (
    <Doughnut data={chartData} options={chartOptions} />
  );
}

export default Charts;