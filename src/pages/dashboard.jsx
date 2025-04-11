import React, { useState, useEffect } from 'react';
import Earth from '../assets/partials/earth';
import ModelSelector from '../assets/partials/modelselector';
import Cardousel from '../assets/partials/cardousel';
import '../assets/partials/LocationSlider.css';

export default function Dashboard() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  return (
    <div className='h-screen w-screen flex'>
        <div className='w-1/2 flex justify-items-center '></div>
        <div className='w-1/2 flex flex-col items-center gap-15'>
            <div className='w-full h-1/2 flex justify-center'>
                <div className='' ><Earth/></div>
            </div>

            <div className='overflow-hidden h-85 w-2/3 p-'><ModelSelector/></div>
        </div>
    </div>
  );
} 