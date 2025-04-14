import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Stats({ statistics, classLegend }) {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedMetrics, setSelectedMetrics] = useState({
    ndvi: true,
    ndwi: true,
    ndsi: true,
    ndmi: true,
    cloud: true,
  });
  
  // Initialize class coverage state for each class
  const [selectedClassCoverage, setSelectedClassCoverage] = useState(
    Object.keys(classLegend || {}).reduce((acc, className) => {
      acc[className] = true;
      return acc;
    }, {})
  );

  // Function to convert RGB array to rgba string
  const rgbToRgba = (rgbArray, alpha = 1) => {
    if (!rgbArray || !Array.isArray(rgbArray) || rgbArray.length !== 3) {
      console.warn('Invalid RGB array:', rgbArray);
      return 'rgba(0, 0, 0, 1)';
    }
    return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${alpha})`;
  };

  const processData = () => {
    if (!statistics || !classLegend) {
      console.log('Missing data:', { statistics, classLegend });
      return null;
    }

    // Sort statistics by time interval
    const sortedStats = [...statistics].sort((a, b) => {
      const [aStart, aEnd] = a.time_interval;
      const [bStart, bEnd] = b.time_interval;
      return new Date(aStart) - new Date(bStart);
    });

    // Extract labels for x-axis
    const labels = sortedStats.map(stat => {
      const [start, end] = stat.time_interval;
      return `${start} - ${end}`;
    });

    // Create datasets for each metric
    const datasets = [];

    if (selectedTab === 'All') {
      // Add class coverage datasets for all classes
      Object.entries(classLegend).forEach(([className, color]) => {
        if (selectedClassCoverage[className]) {
          const data = sortedStats.map(stat => {
            // Check if the class exists in the stats
            if (!stat.stats || !stat.stats[className]) {
              console.warn(`Class ${className} not found in stats:`, stat);
              return 0;
            }
            return stat.stats[className].class_percentage || 0;
          });

          // Use the color from classLegend directly
          const backgroundColor = rgbToRgba(color);
          const borderColor = rgbToRgba(color);

          // Only add dataset if there's at least one non-zero value
          if (data.some(value => value > 0)) {
            datasets.push({
              label: `${className} Percentage`,
              data,
              borderColor,
              backgroundColor,
              tension: 0.4,
              fill: true,
            });
          }
        }
      });

      // Add total cloud coverage dataset
      if (selectedMetrics.cloud) {
        const cloudData = sortedStats.map(stat => {
          // Check if cloud_coverage exists in the stats
          if (!stat.stats || stat.stats.cloud_coverage === undefined) {
            console.warn('Cloud coverage not found in stats:', stat);
            return 0;
          }
          return stat.stats.cloud_coverage || 0;
        });

        // Only add dataset if there's at least one non-zero value
        if (cloudData.some(value => value > 0)) {
          datasets.push({
            label: 'Total Cloud Coverage',
            data: cloudData,
            borderColor: 'rgb(156, 163, 175)', // Gray
            backgroundColor: 'rgb(156, 163, 175)',
            tension: 0.4,
            fill: true,
          });
        }
      }
    } else {
      // Add metrics for the selected class
      const className = selectedTab;
      
      // Check if the class exists in any of the stats
      const hasClassData = sortedStats.some(stat => 
        stat.stats && stat.stats[className]
      );

      if (!hasClassData) {
        console.warn(`No data found for class: ${className}`);
        return {
          labels,
          datasets: [],
        };
      }

      if (selectedMetrics.ndvi) {
        const ndviData = sortedStats.map(stat => {
          if (!stat.stats || !stat.stats[className] || !stat.stats[className].NDVI) {
            return 0;
          }
          return stat.stats[className].NDVI.mean || 0;
        });

        if (ndviData.some(value => value > 0)) {
          datasets.push({
            label: 'NDVI',
            data: ndviData,
            borderColor: 'rgb(34, 197, 94)', // Green
            backgroundColor: 'rgb(34, 197, 94)',
            tension: 0.4,
            fill: true,
          });
        }
      }

      if (selectedMetrics.ndwi) {
        const ndwiData = sortedStats.map(stat => {
          if (!stat.stats || !stat.stats[className] || !stat.stats[className].NDWI) {
            return 0;
          }
          return stat.stats[className].NDWI.mean || 0;
        });

        if (ndwiData.some(value => value > 0)) {
          datasets.push({
            label: 'NDWI',
            data: ndwiData,
            borderColor: 'rgb(59, 130, 246)', // Blue
            backgroundColor: 'rgb(59, 130, 246)',
            tension: 0.4,
            fill: true,
          });
        }
      }

      if (selectedMetrics.ndsi) {
        const ndsiData = sortedStats.map(stat => {
          if (!stat.stats || !stat.stats[className] || !stat.stats[className].NDSI) {
            return 0;
          }
          return stat.stats[className].NDSI.mean || 0;
        });

        if (ndsiData.some(value => value > 0)) {
          datasets.push({
            label: 'NDSI',
            data: ndsiData,
            borderColor: 'rgb(139, 69, 19)', // Brown
            backgroundColor: 'rgb(139, 69, 19)',
            tension: 0.4,
            fill: true,
          });
        }
      }

      if (selectedMetrics.ndmi) {
        const ndmiData = sortedStats.map(stat => {
          if (!stat.stats || !stat.stats[className] || !stat.stats[className].NDMI) {
            return 0;
          }
          return stat.stats[className].NDMI.mean || 0;
        });

        if (ndmiData.some(value => value > 0)) {
          datasets.push({
            label: 'NDMI',
            data: ndmiData,
            borderColor: 'rgb(147, 51, 234)', // Purple
            backgroundColor: 'rgb(147, 51, 234)',
            tension: 0.4,
            fill: true,
          });
        }
      }

      if (selectedMetrics.cloud) {
        const cloudData = sortedStats.map(stat => {
          if (!stat.stats || !stat.stats[className] || stat.stats[className].class_cloud_coverage === undefined) {
            return 0;
          }
          return stat.stats[className].class_cloud_coverage || 0;
        });

        if (cloudData.some(value => value > 0)) {
          datasets.push({
            label: 'Cloud Coverage',
            data: cloudData,
            borderColor: 'rgb(156, 163, 175)', // Gray
            backgroundColor: 'rgb(156, 163, 175)',
            tension: 0.4,
            fill: true,
          });
        }
      }
    }

    return {
      labels,
      datasets,
    };
  };

  const chartData = processData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            color: 'white'
          },
          generateLabels: function(chart) {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.backgroundColor,
              lineWidth: 1,
              hidden: !chart.isDatasetVisible(i),
              index: i,
              fontColor: 'white'
            }));
          },
        },
      },
      title: {
        display: true,
        text: 'Time Series Analysis',
        color: 'white',
        font: {
          color: 'white'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  const toggleClassCoverage = (className) => {
    setSelectedClassCoverage(prev => ({
      ...prev,
      [className]: !prev[className]
    }));
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            selectedTab === 'All' ? 'bg-blue-500' : 'bg-gray-600'
          } text-white`}
          onClick={() => setSelectedTab('All')}
        >
          All Classes
        </button>
        {Object.keys(classLegend || {}).map(className => (
          <button
            key={className}
            className={`px-3 py-1 rounded ${
              selectedTab === className ? 'bg-blue-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => setSelectedTab(className)}
          >
            {className}
          </button>
        ))}
      </div>

      {selectedTab === 'All' ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(classLegend || {}).map(([className, color]) => (
            <button
              key={className}
              className={`px-3 py-1 rounded ${
                selectedClassCoverage[className] ? 'bg-opacity-80' : 'bg-opacity-20'
              } text-white`}
              style={{
                backgroundColor: rgbToRgba(color, selectedClassCoverage[className] ? 0.8 : 0.2)
              }}
              onClick={() => toggleClassCoverage(className)}
            >
              {className}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${
              selectedMetrics.ndvi ? 'bg-green-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => toggleMetric('ndvi')}
          >
            NDVI
          </button>
          <button
            className={`px-3 py-1 rounded ${
              selectedMetrics.ndwi ? 'bg-blue-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => toggleMetric('ndwi')}
          >
            NDWI
          </button>
          <button
            className={`px-3 py-1 rounded ${
              selectedMetrics.ndsi ? 'bg-brown-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => toggleMetric('ndsi')}
          >
            NDSI
          </button>
          <button
            className={`px-3 py-1 rounded ${
              selectedMetrics.ndmi ? 'bg-purple-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => toggleMetric('ndmi')}
          >
            NDMI
          </button>
          <button
            className={`px-3 py-1 rounded ${
              selectedMetrics.cloud ? 'bg-gray-500' : 'bg-gray-600'
            } text-white`}
            onClick={() => toggleMetric('cloud')}
          >
            Cloud Coverage
          </button>
        </div>
      )}

      <div className="h-96">
        {chartData && chartData.datasets.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            No data available for the selected options
          </div>
        )}
      </div>
    </div>
  );
}
