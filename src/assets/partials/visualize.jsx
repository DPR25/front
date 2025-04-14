import React, { useState } from 'react';
import Card from './card';
import DatetimeStamp from './datetimestamp';
import ToggleBtn from './togglebtn';
import Legend from './Legend';
import Stats from './stats';

export default function Visualize({
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderedData || orderedData.length === 0) return <div>No data available</div>;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center border-1 border-[#494c50] rounded-4xl bg-[#1b1c1d] p-10">
      {tagIndex === 0 ? (
        <>
          <div className="w-full h-[95%] flex justify-center items-center gap-20">
            <button
              onClick={() => {
                if (activeIndex >= 1) setActiveIndex(activeIndex - 1);
              }}
            >
              <div
                className={`w-30 h-25 flex justify-center items-center hover:bg-[#343a42]
                hover:cursor-pointer active:bg-[#24282e] rounded-2xl ${
                  activeIndex === 0 ? 'pointer-events-none cursor-not-allowed' : ''
                }`}
              >
                <img src="/arrow_left.svg" alt="" width={60} />
              </div>
            </button>

            <Card
              img_path={orderedData[activeIndex].imagePath}
              mask_path={orderedData[activeIndex].maskPath}
              orderSwitch={isToggled}
            />

            <button
              onClick={() => {
                if (activeIndex < orderedData.length - 1)
                  setActiveIndex(activeIndex + 1);
              }}
            >
              <div
                className={`w-30 h-25 flex justify-center items-center hover:bg-[#343a42]
                hover:cursor-pointer active:bg-[#24282e] rounded-2xl ${
                  activeIndex === orderedData.length - 1
                    ? 'pointer-events-none cursor-not-allowed'
                    : ''
                }`}
              >
                <img src="/arrow_right.svg" alt="" width={60} />
              </div>
            </button>
          </div>

          {/* AAA */}
          <div className='h-20 w-full '>
            <div className="flex w-full justify-between items-center px-5 h-1/2">
         
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-1/2 font-semibold">
                <p>Timestamp</p>
              </div>

              <div className="w-1/2 flex gap-2">
                {orderedData.map((data, index) => (
                  <DatetimeStamp
                    key={index}
                    active={index === activeIndex}
                    startDate={data.startDate}
                    endDate={data.endDate}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-1/4 justify-baseline h-full items-baseline">

              <div className='flex w-full justify-between pr-10 font-semibold'>
                <img src="/cloud.svg" alt="" width={30}/>
                <p>{orderedData[activeIndex].cloudCoverage.toFixed(2)} %</p>
              </div>

              <div className='flex h-full flex-col'>
                <ToggleBtn
                  isToggled={isToggled}
                  onToggle={() => {
                    setIsToggled(!isToggled);
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* BBB */}
        <div className="w-full h-50">
            <Legend classData={posts.metadata.job_data.class_legend}/>
        </div>
        </>
      ) : (
        <div className="w-full h-full">
          <Stats 
            statistics={posts.statistics} 
            classLegend={posts.metadata.job_data.class_legend}
          />
        </div>
      )}
    </div>
  );
}