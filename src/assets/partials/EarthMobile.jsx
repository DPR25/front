import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';

export default function EarthMobile({lat, long, allLocations = [], onLocationSelect, selectedLocation}) {
  const globeRef = useRef(null);
  const [points, setPoints] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  // Update points when allLocations or lat/long changes
  useEffect(() => {
    if (allLocations && allLocations.length > 0) {
      setPoints(allLocations);
    } else {
      setPoints([{
        lat: lat,
        lng: long,
        color: 'rgb(149, 255, 43)',
        name: 'Amazonski deževni gozd',
        size: 2,
        opacity: 1,
      }]);
    }
  }, [allLocations, lat, long]);

  // Center on selected location when it changes
  useEffect(() => {
    if (selectedLocation && globeRef.current) {
      globeRef.current.pointOfView(
        {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          altitude: 2.5,
        },
        2000 // 2-second animation
      );
    }
  }, [selectedLocation]);

  // Flickering effect
  useEffect(() => {
    if (points.length === 0) return;
    
    const interval = setInterval(() => {
      setPoints((prevPoints) =>
        prevPoints.map((point) => ({
          ...point,
          opacity: 0.5 + 0.5 * Math.sin(Date.now() * 0.005),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, [points.length]);

  // Initial setup and animation - only run once when points change
  useEffect(() => {
    if (!globeRef.current || points.length === 0 || initializedRef.current) return;

    try {
      // Initial view
      globeRef.current.pointOfView({ lat: 0, lng: -180, altitude: 2.5 }, 0);

      // Animate to point after delay
      setTimeout(() => {
        if (globeRef.current) {
          const targetPoint = points[0];
          globeRef.current.pointOfView(
            {
              lat: targetPoint.lat,
              lng: targetPoint.lng,
              altitude: 2.5,
            },
            2000 // 2-second animation
          );
        }
      }, 1000);

      initializedRef.current = true;
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  }, [points]);

  const handlePointClick = (point) => {
    console.log('Point clicked:', point);
    if (onLocationSelect && point) {
      // Ensure we're passing the correct location data
      const locationData = {
        id: point.job_id,
        lat: point.lat,
        lng: point.lng,
        name: point.name
      };
      onLocationSelect(locationData);
    }
  };

  return (
    <div className="globe-container w-full h-full">
      <Globe
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d) => d.color || `rgba(149, 255, 43, ${d.opacity})`}
        pointRadius={(d) => d.size}
        pointLabel="name"
        pointAltitude={0.01}
        pointResolution={64}
        pointsMerge={false}
        pointsTransitionDuration={0}
        width={400}
        height={400}
        onPointClick={handlePointClick}
        onGlobeReady={() => {
          try {
            if (globeRef.current) {
              const globe = globeRef.current;
              const controls = globe.controls();
              controls.autoRotate = false; // Disable auto-rotation for spin animation
            }
          } catch (error) {
            console.error('Error setting up globe controls:', error);
          }
        }}
      />
    </div>
  );
}
