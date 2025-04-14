import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Import the JSON response data
// Adjust the import path as needed if your response.json is in your project.
import responseData from './response.json';

const StatsChart = ({ data }) => {
  // Calculate average of all metrics for each time interval
  const chartData = data?.map(item => {
    const metrics = item.stats;
    const allValues = [];
    
    // Collect all metric values
    Object.values(metrics).forEach(category => {
      Object.values(category).forEach(metric => {
        if (typeof metric === 'object' && metric !== null) {
          allValues.push(metric.mean);
        }
      });
    });
    
    // Calculate average of all metrics
    const average = allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
    
    return {
      time_interval: item.time_interval,
      average: average
    };
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Average Metrics Over Time</h2>
      <LineChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time_interval" 
          label={{ value: 'Time Interval', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          label={{ value: 'Average Metric Value', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="average" 
          stroke="#008000" 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </div>
  );
};

export default StatsChart;
