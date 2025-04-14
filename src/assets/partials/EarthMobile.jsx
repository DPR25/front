import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Globe from 'react-globe.gl';

export default function Earth({lat, long}) {
  const globeRef = useRef(null);
  const [points, setPoints] = useState([
    {
      lat: lat,
      lng: long,
      color: 'rgb(149, 255, 43)',
      name: 'Amazonski deževni gozd',
      size: 2,
      opacity: 1,
    },
  ]);
  const location = useLocation();

  // Flickering effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) =>
        prevPoints.map((point) => ({
          ...point,
          opacity: 0.5 + 0.5 * Math.sin(Date.now() * 0.005),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Spin animation
  useEffect(() => {
    if (!globeRef.current) return;

    // Initial view
    globeRef.current.pointOfView({ lat: 0, lng: -180, altitude: 2.5 }, 0);

    // Animate to point after delay
    setTimeout(() => {
      if (points.length > 0) {
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
  }, [location.pathname]);

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
        pointColor={(d) => `rgba(149, 255, 43, ${d.opacity})`}
        pointRadius={(d) => d.size}
        pointLabel="name"
        pointAltitude={0.01}
        pointResolution={64}
        pointsMerge={false}
        pointsTransitionDuration={0}
        width={600}
        height={600}
        onGlobeReady={() => {
          const globe = globeRef.current;
          const controls = globe.controls();
          controls.autoRotate = false; // Disable auto-rotation for spin animation
        }}
      />
    </div>
  );
}
