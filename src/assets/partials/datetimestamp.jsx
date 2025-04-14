import React from 'react'


export default function DatetimeStamp({ active, startDate, endDate }) {
    return (
        <div className="w-5 h-5 relative">
            <div className="bg-gray-500 rounded-full w-3 h-3 absolute top-1 left-1/2 transform -translate-x-1/2"></div>

            {active && (
                <div className="w-40 h-10 rounded-[2px] absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-200 -mt-2"></div>
                    
                    <div className="flex  w-full h-full rounded-xl transparent border border-gray-600 items-center justify-center">
                        <div className='text-[12px] font-semibold'>
                         <p>{`${startDate} - ${endDate}`} </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}