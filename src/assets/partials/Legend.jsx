import React from 'react';

const Legend = ({ classData }) => {
  // Function to convert RGB array to rgba string
  const rgbToRgba = (rgbArray, alpha = 1) => {
    return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${alpha})`;
  };

  return (
    <div className='w-full flex flex-col justify-baseline items-baseline gap-2 p-3'>

      <p className='font-semibold'>
        Segmentation Classes
      </p>

      <div className="flex flex-wrap gap-4 w-full p-2">
        {Object.entries(classData).map(([key, value]) => (
          <div key={key} className='flex items-center gap-2'>
            <div
              className='w-5 h-5 rounded-full'
              style={{ backgroundColor: rgbToRgba(value) }}
            ></div>
            <p className='text-sm'>{key}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Legend;
