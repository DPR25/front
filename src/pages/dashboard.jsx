import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Earth from '../assets/partials/Earth';
import ModelSelector from '../assets/partials/modelselector';
import Visualize from '../assets/partials/visualize';
import '../assets/partials/LocationSlider.css';
import DashboardMobile from './dashboardMobile';
import LocationsManager from '../assets/partials/LocationsManager';

export default function Dashboard() {
  const { id } = useParams(); 
  const [segModelActiveIndex, setSegModelActiveIndex] = useState(0);
  const [slideActiveIndex, setSlideActiveIndex] = useState(0);
  const [orderedData, setOrderedData] = useState(null);
  const [orderedDataWithClouds, setOrderedDataWithClouds] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [tagIndex, setTagIndex] = useState(0)
  const [long, setLong] = useState(0)
  const [lat, setLat] = useState(0)
  const [locationName, setLocationName] = useState("")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [allLocations, setAllLocations] = useState([]);

  const handleLocationsLoaded = React.useCallback((locationsForEarth, locationsData) => {
    setAllLocations(locationsForEarth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <DashboardMobile />;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/locations/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);

        const longitude = data.metadata.job_data.center[0];
        const latitude = data.metadata.job_data.center[1];
        setLong(longitude);
        setLat(latitude);

        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${longitude}&lon=${latitude}&format=json`,
          {
            headers: {
              'User-Agent': 'timber.ai'
            }
          }
        );
        const geoData = await geoRes.json();
        const displayName = geoData.display_name || "Amazon rainforest";
        const trimmedName = displayName.length > 50 ? displayName.substring(0, 50) + "..." : displayName;
        setLocationName(trimmedName);

        const mappedData = mapImageUrlsReverse(data.image_sources || []);
        setOrderedData(mappedData);
        const dataWithClouds = addCloudCoverage(mappedData, data);
        setOrderedDataWithClouds(dataWithClouds);

        console.log('Statistics data:', data.statistics);
        if (data.statistics && data.statistics.length > 0) {
          console.log('First stat entry:', data.statistics[0]);
          console.log('Class colors:', data.statistics[0]?.stats?.class_colors);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  const mapImageUrlsReverse = (urls) => {
    const mapped = [];
    for (let i = urls.length - 2; i >= 0; i -= 2) {
      const imageUrl = urls[i];
      const maskUrl = urls[i + 1];
  
      const match = imageUrl.match(
        /satlas_[a-z0-9]+_(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})_(\d+)_image\.png$/
      );
  
      if (match) {
        const imageFname = imageUrl.split("/").pop(); // just get the filename
        const startDate = match[1];
        const endDate = match[2];
        const seriesIndex = parseInt(match[3], 10);
  
        mapped.unshift({
          imageFname,
          series_index: seriesIndex,
          imagePath: imageUrl,
          maskPath: maskUrl,
          startDate,
          endDate,
        });
      }
    }
    return mapped;
  };
  
  
  const addCloudCoverage = (mappedArray, jsonData) => {
    const statistics = jsonData.statistics || [];
  
    return mappedArray.map((obj) => {
      const imageName = obj.imageFname.replace(/_image\.png$/, '');
      const statEntry = statistics.find((stat) => stat.image_name === imageName);
      const cloudCoverage = statEntry?.stats?.cloud_coverage ?? null;
  
      return {
        ...obj,
        cloudCoverage,
      };
    });
  };

  return (
    <>
      <LocationsManager onLocationsLoaded={handleLocationsLoaded} defaultLocationId={id} />
      <div className="h-screen w-screen flex px-5">
        <div className="w-1/2 h-full flex justify-items-center flex-col justify-center p-10 relative">
          <div className='absolute w-150 h-10 top-10 rounded-4xl left-10 flex'>
            <button onClick={() => {setTagIndex(1-tagIndex)}}>
              <div className={`w-50 h-full p-2 rounded-tl-4xl px-12 py-2 border border-transparent hover:cursor-pointer ${tagIndex === 1 ? 
                " border-b-gray-600 border-r-gray-600 bg-[#131518]" : 
                "border-l-gray-600 border-t-gray-600 border-r-gray-600 " }`}>
                <p>Images</p>
              </div>
            </button>

            <button onClick={() => {setTagIndex(1-tagIndex)}} >
              <div className={`w-50 h-full p-2 px-12 py-2 border border-transparent hover:cursor-pointer ${tagIndex === 1 ? 
                "" : " border-b-gray-600 border-r-gray-600 bg-[#131518]"}`}> 
                <p>Data</p>
              </div>
            </button>
          </div>

          <div className="h-full flex justify-center items-center">
            <Visualize
              jobID={id}
              orderedData={orderedDataWithClouds}
              activeIndex={slideActiveIndex}
              setActiveIndex={setSlideActiveIndex}
              loading={loading}
              error={error}
              posts={posts}
              tagIndex={tagIndex}
              setTagIndex={setTagIndex}
            />
          </div>
        </div>

        <div className="w-1/2 flex h-full flex-col items-center gap-15">
          <div className="w-full h-1/2 flex justify-center">
            <div className="">
              <Earth 
                lat={lat}
                long={long}
                allLocations={allLocations}
              />
            </div>
          </div>

          <div className="overflow-hidden h-“05 w-2/3 p-">
            <p>{locationName}</p>
            <ModelSelector
              activeIndex={segModelActiveIndex}
              setActiveIndex={setSegModelActiveIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
}