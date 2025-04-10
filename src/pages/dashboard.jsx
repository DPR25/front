import React, { useState, useEffect } from 'react';
import Earth from '../assets/partials/earth';
import ModelSelector from '../assets/partials/modelselector';
import Cardousel from '../assets/partials/cardousel';
import '../assets/partials/LocationSlider.css';

export default function Dashboard() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  return (
    <div className="w-full h-screen bg-[#131518] overflow-hidden flex justify-center m-0 p-0 flex-col md:flex-row">
      {/* Leva stran - Informacije in seznam lokacij */}
      <div className="w-full md:w-full p-5 flex flex-col justify-end relative z-10">
  
        
        {/* Srednji del - Slider s Card komponentami */}

        <div className='h-screen w-full flex items-baseline'>
            
        </div>

        <div style={{transform: 'scale(0.7)'}} className=''>
        <Cardousel/>
        </div>
      </div>
      
      {/* Desna stran - Zemlja */}
      <div className="w-full md:w-1/2 h-full bg-transparent flex flex-col items-center">
        <div className="flex items-center">
          <Earth/>
        </div>
        <div className='w-full h-80'>
            <ModelSelector/>
        </div>
      </div>
    </div>
  );
} 