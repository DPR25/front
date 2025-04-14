import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Earth from '../assets/partials/EarthMobile';
import ModelSelector from '../assets/partials/modelselector';
import VisualizeMobile from '../assets/partials/visualizeMobile';

export default function DashboardMobile() {
  const { id } = useParams();
  const [segModelActiveIndex, setSegModelActiveIndex] = useState(0);
  const [slideActiveIndex, setSlideActiveIndex] = useState(0);
  const [orderedData, setOrderedData] = useState(null);
  const [orderedDataWithClouds, setOrderedDataWithClouds] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tagIndex, setTagIndex] = useState(0);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [locationName, setLocationName] = useState("");

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
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          {
            headers: {
              'User-Agent': 'timber.ai'
            }
          }
        );
        const geoData = await geoRes.json();
        setLocationName(geoData.display_name || "Amazon rainforest");

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
        const imageFname = imageUrl.split("/").pop();
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
      return { ...obj, cloudCoverage };
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#131518] p-3">
      {/* Location Header */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-white">{locationName}</h1>
        <p className="text-xs text-gray-400">
          Coordinates: {lat.toFixed(4)}, {long.toFixed(4)}
        </p>
      </div>

      {/* Earth Component */}
      <div className="w-full h-[400px] mb-3 bg-[#1b1c1d] rounded-xl overflow-hidden items-center">
        <Earth lat={lat} long={long} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <VisualizeMobile
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

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed top-3 right-3 left-3 bg-red-500 text-white p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 