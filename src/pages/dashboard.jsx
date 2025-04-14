import React, { useState, useEffect } from 'react';
import Earth from '../assets/partials/Earth';
import ModelSelector from '../assets/partials/modelselector';
import Visualize from '../assets/partials/visualize';
import '../assets/partials/LocationSlider.css';

export default function Dashboard() {
  const [segModelActiveIndex, setSegModelActiveIndex] = useState(0);
  const [slideActiveIndex, setSlideActiveIndex] = useState(0);
  const [orderedData, setOrderedData] = useState(null);
  const [orderedDataWithClouds, setOrderedDataWithClouds] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const jobID = '0bc098b0-4050-41ed-be23-230723d9457f';

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/locations/${jobID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        const mappedData = mapImageUrlsReverse(data.image_sources || []);
        setOrderedData(mappedData);
        const dataWithClouds = addCloudCoverage(mappedData, data);
        setOrderedDataWithClouds(dataWithClouds);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [jobID]);
  
  const mapImageUrlsReverse = (urls) => {
    const mapped = [];
    for (let i = urls.length - 2; i >= 0; i -= 2) {
      const imageUrl = urls[i];
      const maskUrl = urls[i + 1];
  
      const match = imageUrl.match(
        /satlas_rgb2_(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})_(\d)_image\.png$/
      );
      if (match) {
        const imageFname = `satlas_rgb2_${match[1]}-${match[2]}_${match[3]}_image.png`;
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
    <div className="h-screen w-screen flex p-10">
      <div className="w-1/2 h-screen flex justify-items-center flex-col justify-center">
        <div className="h-2/3 flex justify-center items-center">
          <Visualize
            jobID={jobID}
            orderedData={orderedDataWithClouds}
            activeIndex={slideActiveIndex}
            setActiveIndex={setSlideActiveIndex}
            loading={loading}
            error={error}
          />
        </div>

        <div className="h-1/3 flex justify-center items-center">
          <p>im alive</p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center gap-15">
        <div className="w-full h-1/2 flex justify-center">
          <div className="">
            <Earth />
          </div>
        </div>

        <div className="overflow-hidden h-85 w-2/3 p-">
          <ModelSelector
            activeIndex={segModelActiveIndex}
            setActiveIndex={setSegModelActiveIndex}
          />
        </div>
      </div>
    </div>
  );
}