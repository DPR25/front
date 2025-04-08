import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import EarthAnimation from '../assets/partials/EarthAnimation';
import LocationSlider from '../assets/partials/LocationSlider';
import '../assets/partials/LocationSlider.css';

export default function Earth() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  const worldLocations = [
    {
      lat: -3.4653,
      lng: -62.2159,
      color: 'rgba(255, 68, 68, 0.7)',
      name: 'Amazon Rainforest',
      size: 2,
      offset: 0,
      image: '/locations/amazon.jpg',
      img_path: '/dummy-slider/img0.png',
      mask_path: '/dummy-slider/mask0.png',
      description: 'The Amazon rainforest is the largest tropical forest in the world, home to half of all known plant and animal species on Earth.',
      images: [
        { img_path: '/dummy-slider/img0.png', mask_path: '/dummy-slider/mask0.png' },
        { img_path: '/dummy-slider/img1.png', mask_path: '/dummy-slider/mask1.png' },
        { img_path: '/dummy-slider/img2.png', mask_path: '/dummy-slider/mask2.png' },
      ],
      stats: {
        'Area': '5.5 million km²',
        'Tree species': '>16,000',
        'Animal species': '>2,000',
        'Threat level': 'High'
      },
      forestData: {
        labels: ['1990', '2000', '2010', '2015', '2020', '2023'],
        data: [420, 380, 340, 315, 280, 260],
        percentChange: -38,
      }
    },
    {
      lat: -2.1833,
      lng: 113.9184,
      color: 'rgba(255, 68, 68, 0.7)',
      name: 'Borneo',
      size: 2.2,
      offset: 0.2,
      image: '/locations/borneo.jpg',
      img_path: '/dummy-slider/img1.png',
      mask_path: '/dummy-slider/mask1.png',
      description: 'Borneo is the third largest island in the world and home to unique rainforests and endangered orangutans.',
      images: [
        { img_path: '/dummy-slider/img1.png', mask_path: '/dummy-slider/mask1.png' },
        { img_path: '/dummy-slider/img2.png', mask_path: '/dummy-slider/mask2.png' },
        { img_path: '/dummy-slider/img3.png', mask_path: '/dummy-slider/mask3.png' },
      ],
      stats: {
        'Area': '743,330 km²',
        'Countries': '3 (Indonesia, Malaysia, Brunei)',
        'Highest peak': '4,095 m (Kinabalu)',
        'Deforestation': '> 30% since 1973'
      },
      forestData: {
        labels: ['1990', '2000', '2010', '2015', '2020', '2023'],
        data: [330, 290, 230, 200, 180, 165],
        percentChange: -50,
      }
    },
    {
      lat: 46.8625, 
      lng: -121.7674,
      color: 'rgba(43, 255, 184, 0.7)',
      name: 'Mount Rainier',
      size: 1.8,
      offset: 0.4,
      image: '/locations/rainier.jpg',
      img_path: '/dummy-slider/img2.png',
      mask_path: '/dummy-slider/mask2.png',
      description: 'Mount Rainier is an active stratovolcano in Washington state, USA, known for its glaciers.',
      images: [
        { img_path: '/dummy-slider/img2.png', mask_path: '/dummy-slider/mask2.png' },
        { img_path: '/dummy-slider/img3.png', mask_path: '/dummy-slider/mask3.png' },
        { img_path: '/dummy-slider/img0.png', mask_path: '/dummy-slider/mask0.png' },
      ],
      stats: {
        'Height': '4,392 m',
        'Activity': 'Dormant',
        'Number of glaciers': '25',
        'Last eruption': '1894'
      },
      forestData: {
        labels: ['1990', '2000', '2010', '2015', '2020', '2023'],
        data: [120, 110, 105, 108, 112, 115],
        percentChange: -4,
      }
    },
    {
      lat: 60.472,
      lng: -149.3502,
      color: 'rgba(43, 255, 184, 0.7)',
      name: 'Chugach National Forest',
      size: 2.3,
      offset: 0.6,
      image: '/locations/chugach.jpg',
      img_path: '/dummy-slider/img3.png',
      mask_path: '/dummy-slider/mask3.png',
      description: 'Chugach is one of the largest national forests in the USA, located in Alaska and including glaciers, fjords, and alpine mountains.',
      images: [
        { img_path: '/dummy-slider/img3.png', mask_path: '/dummy-slider/mask3.png' },
        { img_path: '/dummy-slider/img0.png', mask_path: '/dummy-slider/mask0.png' },
        { img_path: '/dummy-slider/img1.png', mask_path: '/dummy-slider/mask1.png' },
      ],
      stats: {
        'Area': '27,100 km²',
        'Established': '1907',
        'Ecosystems': '5 major',
        'Number of glaciers': '>20'
      },
      forestData: {
        labels: ['1990', '2000', '2010', '2015', '2020', '2023'],
        data: [90, 92, 95, 96, 98, 100],
        percentChange: 11,
      }
    },
    {
      lat: -33.9544,
      lng: 18.4241,
      color: 'rgba(43, 255, 184, 0.7)',
      name: 'Table Mountain',
      size: 2.1,
      offset: 0.8,
      image: '/locations/table-mountain.jpg',
      img_path: '/dummy-slider/img0.png',
      mask_path: '/dummy-slider/mask0.png',
      description: 'Table Mountain is an iconic flat-topped mountain that dominates the city of Cape Town in South Africa.',
      images: [
        { img_path: '/dummy-slider/img0.png', mask_path: '/dummy-slider/mask0.png' },
        { img_path: '/dummy-slider/img3.png', mask_path: '/dummy-slider/mask3.png' },
        { img_path: '/dummy-slider/img2.png', mask_path: '/dummy-slider/mask2.png' },
      ],
      stats: {
        'Height': '1,085 m',
        'Age': '~600 million years',
        'Plant species': '>1,470',
        'Cable car': 'since 1929'
      },
      forestData: {
        labels: ['1990', '2000', '2010', '2015', '2020', '2023'],
        data: [45, 42, 38, 35, 39, 43],
        percentChange: -4,
      }
    }
  ];

  const handleSlideChange = (index) => {
    setCurrentLocationIndex(index);
  };

  return (
    <div className="w-full h-screen bg-[#131518] overflow-hidden flex flex-col md:flex-row">
      {/* Leva stran - Informacije in seznam lokacij */}
      <div className="w-full md:w-1/2 p-5 flex flex-col relative z-10">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-white">{worldLocations[currentLocationIndex].name}</h1>
          
          {/* Seznam lokacij */}
          <div className="location-list mt-4">
            <ul className="space-y-2">
              {worldLocations.map((location, index) => (
                <li 
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    currentLocationIndex === index 
                      ? "text-white font-bold pl-2 border-l-4 border-white" 
                      : "text-gray-400 hover:text-gray-200 pl-2"
                  }`}
                  onClick={() => setCurrentLocationIndex(index)}
                >
                  {location.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Opis lokacije */}
          <div className="location-description bg-[#1a1d21] rounded-lg mt-6 p-4 border border-gray-800">
            <p className="text-gray-300 mb-4">{worldLocations[currentLocationIndex].description}</p>
            
            {worldLocations[currentLocationIndex].stats && (
              <div className="stats-container">
                <h3 className="text-white text-sm uppercase mb-2 font-semibold">Location Data</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(worldLocations[currentLocationIndex].stats).map(([key, value], index) => (
                    <div key={index} className="stat-item bg-[#252a30] p-2 rounded text-sm">
                      <span className="stat-label text-gray-400">{key}:</span>{' '}
                      <span className="stat-value text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Graf deforestacije */}
          <div className="forest-chart bg-[#1a1d21] rounded-lg mt-4 p-4 border border-gray-800">
            <h3 className="text-white text-sm uppercase mb-2 font-semibold">Forest Coverage Trend (1990-2023)</h3>
            <div className="chart-container relative h-48">
              {worldLocations[currentLocationIndex].forestData && (
                <LineChart
                  series={[
                    {
                      data: worldLocations[currentLocationIndex].forestData.data,
                      label: 'Forest cover',
                      color: worldLocations[currentLocationIndex].forestData.percentChange >= 0 ? '#10B981' : '#EF4444',
                    },
                  ]}
                  xAxis={[{
                    data: worldLocations[currentLocationIndex].forestData.labels,
                    scaleType: 'point',
                  }]}
                  height={160}
                  margin={{ top: 10, bottom: 20, left: 40, right: 10 }}
                  slotProps={{
                    legend: {
                      hidden: true
                    }
                  }}
                  sx={{
                    '.MuiLineElement-root': {
                      strokeWidth: 3,
                    },
                    '.MuiMarkElement-root': {
                      stroke: '#1a1d21',
                      strokeWidth: 1,
                      fill: worldLocations[currentLocationIndex].forestData.percentChange >= 0 ? '#10B981' : '#EF4444',
                    },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                      fill: '#9CA3AF',
                      fontSize: '0.75rem',
                    },
                    '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
                      fill: '#9CA3AF',
                      fontSize: '0.75rem',
                    },
                  }}
                />
              )}
              <div className="trend-info mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-300">
                  Overall change: 
                  <span className={worldLocations[currentLocationIndex].forestData.percentChange >= 0 ? 'text-green-500 ml-1' : 'text-red-500 ml-1'}>
                    {worldLocations[currentLocationIndex].forestData.percentChange >= 0 ? '+' : ''}
                    {worldLocations[currentLocationIndex].forestData.percentChange}%
                  </span>
                </span>
                <span className="text-sm text-gray-400">
                  Forest cover (thousand km²)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Srednji del - Slider s Card komponentami */}
        <div className="flex-grow flex items-center justify-center my-6">
          {currentLocationIndex !== undefined && worldLocations.length > 0 && (
            <LocationSlider 
              locations={worldLocations}
              currentLocation={worldLocations[currentLocationIndex]}
              onSlideChange={handleSlideChange}
            />
          )}
        </div>
      </div>
      
      {/* Desna stran - Zemlja */}
      <div className="w-full md:w-1/2 h-full relative bg-transparent flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <EarthAnimation 
            locations={worldLocations} 
            currentLocationIndex={currentLocationIndex}
            onLocationChange={setCurrentLocationIndex}
          />
        </div>
      </div>
    </div>
  );
} 