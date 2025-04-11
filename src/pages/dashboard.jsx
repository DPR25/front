import React, { useState, useEffect } from 'react';
import Earth from '../assets/partials/earth';
import ModelSelector from '../assets/partials/modelselector';
import Visualize from '../assets/partials/visualize';
import '../assets/partials/LocationSlider.css';

export default function Dashboard() {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='h-screen w-screen flex'>
        <div className='w-1/2 h-screen flex justify-items-center flex-col justify-center'>
            <div className='h-2/3 flex justify-center items-center'>
                    <Visualize jobID={'0bc098b0-4050-41ed-be23-230723d9457f'}/>
            </div>

            <div className='h-1/3 flex justify-center items-center'>
                <p>im alive</p>
            </div>
        </div>

        <div className='w-1/2 flex flex-col items-center gap-15'>
            <div className='w-full h-1/2 flex justify-center'>
                <div className=''><Earth/></div>
            </div>

            <div className='overflow-hidden h-85 w-2/3 p-'>
            <ModelSelector activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            </div>
        </div>
    </div>
  );
} 