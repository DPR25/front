import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';

export default function Earth({lat, long, allLocations = []}) {
  const globeRef = useRef(null);
  const [points, setPoints] = useState([]);
  const initializedRef = useRef(false);
  const navigate = useNavigate();

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
            2000
          );
        }
      }, 1000);

      initializedRef.current = true;
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  }, [points]);

  const handlePointClick = (point) => {
    if (point.job_id) {
      // Navigate to the selected location's dashboard
      navigate(`/dashboard/${point.job_id}`);
      
      // Center the globe on the selected point
      if (globeRef.current) {
        globeRef.current.pointOfView(
          {
            lat: point.lat,
            lng: point.lng,
            altitude: 2.5,
          },
          1000
        );
      }
    }
  };

  return (
    <div style={{ width: '600px', height: '600px' }}>
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
        width={600}
        height={600}
        onPointClick={handlePointClick}
        onGlobeReady={() => {
          try {
            if (globeRef.current) {
              const globe = globeRef.current;
              const controls = globe.controls();
              controls.autoRotate = false;
            }
          } catch (error) {
            console.error('Error setting up globe controls:', error);
          }
        }}
      />
    </div>
  );
}
