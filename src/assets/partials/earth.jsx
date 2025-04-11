import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Add this import
import Globe from 'react-globe.gl';
import { MeshLambertMaterial, DoubleSide } from 'three';
import * as topojson from 'topojson-client';

const polygonsMaterial = new MeshLambertMaterial({ color: 'gray', side: DoubleSide });

export default function Earth() {
  const globeRef = useRef(null);
  const [landPolygons, setLandPolygons] = useState([]);
  const [points, setPoints] = useState([
    { lat: -3.4653, lng: -62.2159, color: 'rgb(149, 255, 43)', name: 'Amazonski deževni gozd', size: 2, offset: 0, opacity: 1 },
  ]);
  const location = useLocation(); // Add this to track route changes

  // Load land polygons (unchanged)
  useEffect(() => {
    fetch('//unpkg.com/world-atlas/land-110m.json')
      .then(res => res.json())
      .then(landTopo => {
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  // Flickering effect (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints =>
        prevPoints.map(point => ({
          ...point,
          opacity: 0.5 + 0.5 * Math.sin(Date.now() * 0.005),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Animation on route change
  useEffect(() => {
    if (!globeRef.current) return;

    // Set initial viewpoint (Pacific Ocean)
    globeRef.current.pointOfView(
      {
        lat: 0,
        lng: -180,
        altitude: 2.5,
      },
      0
    );

    // Rotate to Amazon after delay
    setTimeout(() => {
      if (points.length > 0) {
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
  }, [location.pathname]); // Re-run when route changes

  const handleGlobeReady = () => {
    // Initial setup can stay, but useEffect handles animation now
    globeRef.current.pointOfView(
      {
        lat: 0,
        lng: -180,
        altitude: 2.5,
      },
      0
    );
  };

  // Return unchanged
  return (
    <div>
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={false}
        showAtmosphere={false}
        polygonsData={landPolygons}
        polygonCapMaterial={polygonsMaterial}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
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
        onGlobeReady={handleGlobeReady}
      />
    </div>
  );
}