import React, { useState } from 'react';
import CardMobile from './CardMobile';
import DatetimeStamp from './datetimestamp';
import ToggleBtn from './togglebtn';
import Legend from './Legend';
import Stats from './stats';

export default function VisualizeMobile({
  orderedData,
  activeIndex,
  setActiveIndex,
  loading,
  error,
  posts,
  tagIndex,
  setTagIndex
}) {
  const [isToggled, setIsToggled] = useState(false);

  if (loading) return null;
  if (error) return null;
  if (!orderedData || orderedData.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col justify-start items-center border-1 border-[#494c50] rounded-xl bg-[#1b1c1d] p-3">
      {tagIndex === 0 ? (
        <>
          {/* Image Section */}
          <div className="w-full aspect-square relative mb-3">
            <CardMobile
              img_path={orderedData[activeIndex].imagePath}
              mask_path={orderedData[activeIndex].maskPath}
              orderSwitch={isToggled}
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full ${
                activeIndex === 0 ? 'opacity-50' : 'active:bg-black/70'
              }`}
            >
              <img src="/arrow_left.svg" alt="Previous" className="w-5" />
            </button>

            <button
              onClick={() => activeIndex < orderedData.length - 1 && setActiveIndex(activeIndex + 1)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full ${
                activeIndex === orderedData.length - 1 ? 'opacity-50' : 'active:bg-black/70'
              }`}
            >
              <img src="/arrow_right.svg" alt="Next" className="w-5" />
            </button>
          </div>

          {/* Timeline Dots */}
          <div className="w-full flex justify-center gap-2 mb-3">
            {orderedData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="w-full px-3 mb-3">
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="text-sm font-semibold">
                <DatetimeStamp
                  active={true}
                  startDate={orderedData[activeIndex].startDate}
                  endDate={orderedData[activeIndex].endDate}
                />
              </div>
            </div>
            
            <div className="flex justify-center mt-20">
              <ToggleBtn
                isToggled={isToggled}
                onToggle={() => setIsToggled(!isToggled)}
              />
            </div>
          </div>

          {/* Legend */}
          <div className="w-full h-50">
            <Legend classData={posts.metadata.job_data.class_legend}/>
          </div>
        </>
      ) : (
        <div className="w-full h-[calc(100vh-200px)]">
          <Stats 
            statistics={posts.statistics} 
            classLegend={posts.metadata.job_data.class_legend}
          />
        </div>
      )}
    </div>
  );
} 