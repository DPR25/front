import React, { useState } from 'react';
import EarthAnimation from '../assets/partials/EarthAnimation';

export default function Earth() {

  const worldLocations = [
    { lat: -3.4653, lng: -62.2159, color: 'rgba(255, 68, 68, 0.7)', name: 'Amazonski deževni gozd', size: 2, offset: 0 },
    { lat: -2.1833, lng: 113.9184, color: 'rgba(255, 68, 68, 0.7)', name: 'Borneo', size: 2.2, offset: 0.2 },
    { lat: 46.8625, lng: -121.7674, color: 'rgba(43, 255, 184, 0.7)', name: 'Mount Rainier', size: 1.8, offset: 0.4 },
    { lat: 60.472, lng: -149.3502, color: 'rgba(43, 255, 184, 0.7)', name: 'Chugach National Forest', size: 2.3, offset: 0.6 },
    { lat: -33.9544, lng: 18.4241, color: 'rgba(43, 255, 184, 0.7)', name: 'Table Mountain', size: 2.1, offset: 0.8 },
  ];



  return (
    <div className="w-full h-screen bg-[#131518] overflow-hidden">
      
      <div className="w-full h-full">
        <EarthAnimation locations={worldLocations} />
      </div>
    </div>
  );
} 