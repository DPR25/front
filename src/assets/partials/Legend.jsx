import React from 'react';

const Legend = ({ classData }) => {
  return (
    <div className='w-full flex flex-col justify-baseline items-baseline gap-2 p-3'>

      <p className='font-semibold'>
        Segmentation Classes
      </p>

      <div className="grid grid-cols-3 grid-rows-5 gap-2 w-full p-2">
        {Object.entries(classData).map(([key, value]) => (
          <div key={key} className='flex items-center gap-4 mb-2'>
            <p className='w-24'>{key}</p>
            <div
              className='w-5 h-5 rounded-full'
              style={{ backgroundColor: `rgb(${value.join(',')})` }}
            ></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Legend;
