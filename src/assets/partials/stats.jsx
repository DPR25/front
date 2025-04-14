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
          datasets.push({
            label: `${className} Percentage`,
            data: sortedStats.map(stat => {
              // Check if the class exists in the stats
              if (!stat.stats[className]) {
                console.warn(`Class ${className} not found in stats:`, stat);
                return 0;
              }
              return stat.stats[className].class_percentage;
            }),
            borderColor: rgbToRgba(color, 0.8),
            backgroundColor: rgbToRgba(color, 0.8),
            tension: 0.4,
            fill: true,
          });
        }
      });

      // Add total cloud coverage dataset
      if (selectedMetrics.cloud) {
        datasets.push({
          label: 'Total Cloud Coverage',
          data: sortedStats.map(stat => {
            // Check if cloud_coverage exists in the stats
            if (stat.stats.cloud_coverage === undefined) {
              console.warn('Cloud coverage not found in stats:', stat);
              return 0;
            }
            return stat.stats.cloud_coverage;
          }),
          borderColor: 'rgb(156, 163, 175)', // Gray
          backgroundColor: 'rgb(156, 163, 175)',
          tension: 0.4,
          fill: true,
        });
      }
    } else {
      // Add metrics for the selected class
      const className = selectedTab;
      if (selectedMetrics.ndvi) {
        datasets.push({
          label: 'NDVI',
          data: sortedStats.map(stat => {
            // Check if the class and NDVI exist in the stats
            if (!stat.stats[className] || !stat.stats[className].NDVI) {
              console.warn(`Class ${className} or NDVI not found in stats:`, stat);
              return 0;
            }
            return stat.stats[className].NDVI.mean;
          }),
          borderColor: 'rgb(34, 197, 94)', // Green
          backgroundColor: 'rgb(34, 197, 94)',
          tension: 0.4,
          fill: true,
        });
      }

      if (selectedMetrics.ndwi) {
        datasets.push({
          label: 'NDWI',
          data: sortedStats.map(stat => {
            // Check if the class and NDWI exist in the stats
            if (!stat.stats[className] || !stat.stats[className].NDWI) {
              console.warn(`Class ${className} or NDWI not found in stats:`, stat);
              return 0;
            }
            return stat.stats[className].NDWI.mean;
          }),
          borderColor: 'rgb(59, 130, 246)', // Blue
          backgroundColor: 'rgb(59, 130, 246)',
          tension: 0.4,
          fill: true,
        });
      }

      if (selectedMetrics.ndsi) {
        datasets.push({
          label: 'NDSI',
          data: sortedStats.map(stat => {
            // Check if the class and NDSI exist in the stats
            if (!stat.stats[className] || !stat.stats[className].NDSI) {
              console.warn(`Class ${className} or NDSI not found in stats:`, stat);
              return 0;
            }
            return stat.stats[className].NDSI.mean;
          }),
          borderColor: 'rgb(139, 69, 19)', // Brown
          backgroundColor: 'rgb(139, 69, 19)',
          tension: 0.4,
          fill: true,
        });
      }

      if (selectedMetrics.ndmi) {
        datasets.push({
          label: 'NDMI',
          data: sortedStats.map(stat => {
            // Check if the class and NDMI exist in the stats
            if (!stat.stats[className] || !stat.stats[className].NDMI) {
              console.warn(`Class ${className} or NDMI not found in stats:`, stat);
              return 0;
            }
            return stat.stats[className].NDMI.mean;
          }),
          borderColor: 'rgb(147, 51, 234)', // Purple
          backgroundColor: 'rgb(147, 51, 234)',
          tension: 0.4,
          fill: true,
        });
      }

      if (selectedMetrics.cloud) {
        datasets.push({
          label: 'Cloud Coverage',
          data: sortedStats.map(stat => {
            // Check if the class and class_cloud_coverage exist in the stats
            if (!stat.stats[className] || stat.stats[className].class_cloud_coverage === undefined) {
              console.warn(`Class ${className} or class_cloud_coverage not found in stats:`, stat);
              return 0;
            }
            return stat.stats[className].class_cloud_coverage;
          }),
          borderColor: 'rgb(156, 163, 175)', // Gray
          backgroundColor: 'rgb(156, 163, 175)',
          tension: 0.4,
          fill: true,
        });
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
        title: {
          display: true,
          text: 'Value',
          color: 'white',
          font: {
            color: 'white'
          }
        },
        ticks: {
          color: 'white',
          font: {
            color: 'white'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time Interval',
          color: 'white',
          font: {
            color: 'white'
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: 'white',
          font: {
            color: 'white'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const toggleClassCoverage = (className) => {
    setSelectedClassCoverage(prev => ({
      ...prev,
      [className]: !prev[className],
    }));
  };

  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedTab('All')}
          className={`px-3 py-1 rounded ${
            selectedTab === 'All'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        {Object.entries(classLegend).map(([className, color]) => (
          <button
            key={className}
            onClick={() => setSelectedTab(className)}
            className={`px-3 py-1 rounded ${
              selectedTab === className
                ? 'text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            style={selectedTab === className ? { backgroundColor: rgbToRgba(color) } : {}}
          >
            {className}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedTab === 'All' ? (
          <>
            {Object.entries(classLegend).map(([className, color]) => (
              <button
                key={className}
                onClick={() => toggleClassCoverage(className)}
                className={`px-3 py-1 rounded ${
                  selectedClassCoverage[className]
                    ? `text-white` 
                    : 'bg-gray-200 text-gray-700'
                }`}
                style={selectedClassCoverage[className] ? { backgroundColor: rgbToRgba(color) } : {}}
              >
                {className} Coverage
              </button>
            ))}
            <button
              onClick={() => toggleMetric('cloud')}
              className={`px-3 py-1 rounded ${
                selectedMetrics.cloud
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Cloud Coverage
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleMetric('ndvi')}
              className={`px-3 py-1 rounded ${
                selectedMetrics.ndvi
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              NDVI
            </button>
            <button
              onClick={() => toggleMetric('ndwi')}
              className={`px-3 py-1 rounded ${
                selectedMetrics.ndwi
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              NDWI
            </button>
            <button
              onClick={() => toggleMetric('ndsi')}
              className={`px-3 py-1 rounded ${
                selectedMetrics.ndsi
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              style={selectedMetrics.ndsi ? { backgroundColor: 'rgb(139, 69, 19)' } : {}}
            >
              NDSI
            </button>
            <button
              onClick={() => toggleMetric('ndmi')}
              className={`px-3 py-1 rounded ${
                selectedMetrics.ndmi
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              NDMI
            </button>
            <button
              onClick={() => toggleMetric('cloud')}
              className={`px-3 py-1 rounded ${
                selectedMetrics.cloud
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Cloud Coverage
            </button>
          </>
        )}
      </div>
      <div className="flex-1">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
