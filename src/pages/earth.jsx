import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import EarthAnimation from '../assets/partials/EarthAnimation';
import Cardousel from '../assets/partials/cardousel';
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
        { img_path: '/dummy-slider/img3.png', mask_path: '/dummy-slider/mask3.png' },
        { img_path: '/dummy-slider/img2.png', mask_path: '/dummy-slider/mask2.png' },
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


  return (
    <div className="w-full h-screen bg-[#131518] overflow-hidden flex flex-col md:flex-row">
      {/* Leva stran - Informacije in seznam lokacij */}
      <div className="w-full md:w-1/2 p-5 flex flex-col justify-end relative z-10">
  
        
        {/* Srednji del - Slider s Card komponentami */}
        <Cardousel/>
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