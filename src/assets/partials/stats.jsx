import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend,
  PieChart,
  Pie,
  Tooltip as PieTooltip
} from 'recharts';

// Import the JSON response data
// Adjust the import path as needed if your response.json is in your project.
import responseData from './response.json';

const StatsChart = () => {
  // Define the image we want to focus on.
  const selectedImageName = "satlas_amazon_2024-07-01-2024-07-31_6";
  
  // Look for the statistics corresponding to the selected image.
  const selectedStats = responseData.statistics.find(
    (item) => item.image_name === selectedImageName
  );
  
  if (!selectedStats) {
    return <div>No data available for image: {selectedImageName}</div>;
  }
  
  // Extract NDMI statistics for both background and forest
  const { NDMI: bgNDMI } = selectedStats.stats.background;
  const { NDMI: forestNDMI } = selectedStats.stats.forest;
  
  // Create an array for the bar chart comparing NDMI stats.
  const statKeys = ["min", "max", "mean", "median", "std"];
  const ndmiCombinedData = statKeys.map(key => ({
    stat: key,
    Background: bgNDMI[key],
    Forest: forestNDMI[key]
  }));
  
  // Prepare data for the pie chart from the class percentages.
  const classData = [
    { name: 'Background', value: selectedStats.stats.background.class_percentage },
    { name: 'Forest', value: selectedStats.stats.forest.class_percentage }
  ];
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>NDMI Statistics Comparison</h2>
      <BarChart
        width={600}
        height={300}
        data={ndmiCombinedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stat" />
        <YAxis />
        <BarTooltip />
        <Legend />
        <Bar dataKey="Background" fill="#808080" />
        <Bar dataKey="Forest" fill="#008000" />
      </BarChart>
      
    </div>
  );
};

export default StatsChart;
