'use client';

import { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// Privzete lokacije
const defaultLocations = [
  { lat: -3.4653, lng: -62.2159, color: 'rgba(255, 68, 68, 0.7)', name: 'Amazonski deževni gozd', size: 2, offset: 0 },
  { lat: -2.1833, lng: 113.9184, color: 'rgba(255, 68, 68, 0.7)', name: 'Borneo', size: 2.2, offset: 0.2 },
  { lat: 46.8625, lng: -121.7674, color: 'rgba(43, 255, 184, 0.7)', name: 'Mount Rainier', size: 1.8, offset: 0.4 },
  { lat: 60.472, lng: -149.3502, color: 'rgba(43, 255, 184, 0.7)', name: 'Chugach National Forest', size: 2.3, offset: 0.6 },
  { lat: -33.9544, lng: 18.4241, color: 'rgba(43, 255, 184, 0.7)', name: 'Table Mountain', size: 2.1, offset: 0.8 },
];

export default function EarthAnimation({ 
  locations = defaultLocations,
  currentLocationIndex = 0,
  onLocationChange = () => {}
}) {
  const globeRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [points, setPoints] = useState(locations);
  const autoRotateTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  // Posodobi točke, ko se spremenijo lokacije
  useEffect(() => {
    setPoints(locations);
  }, [locations]);

  // Premakni pogled na trenutno lokacijo, ko se spremeni indeks
  useEffect(() => {
    if (!globeRef.current || locations.length === 0) return;

    const currentLocation = locations[currentLocationIndex];

    globeRef.current.pointOfView({
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      altitude: 2.5
    }, 2000);

    // Očisti obstoječi timer, če obstaja
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }

    // Nastavi novi timer za avtomatsko rotacijo
    autoRotateTimerRef.current = setTimeout(() => {
      onLocationChange((currentLocationIndex + 1) % locations.length);
    }, 4000);

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [currentLocationIndex, locations, onLocationChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints =>
        prevPoints.map(point => {
          const time = Date.now() / 1000;
          const pulse = Math.sin(time * 2 + point.offset * Math.PI * 2) * 0.5 + 1;

          const baseOpacity = 0.7;
          const opacityFactor = 1 - (pulse - 0.5) * 0.3;

          return {
            ...point,
            currentSize: point.size * pulse,
            currentColor: point.color.replace(/[\d.]+\)$/g, `${baseOpacity * opacityFactor})`)
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const customPointRender = (d) => {
    if (!globeRef.current) return new THREE.Mesh();

    const point = d;
    const circleGeometry = new THREE.CircleGeometry(point.currentSize || point.size, 32);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(point.currentColor || point.color),
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh(circleGeometry, material);

    try {
      const position = globeRef.current.getCoords(point.lat, point.lng, 0.01);
      if (position) {
        circle.position.set(position.x, position.y, position.z);
        circle.lookAt(0, 0, 0);
      }
    } catch (error) {
      console.error('Napaka pri postavitvi kroga:', error);
    }

    return circle;
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="https://unpkg.com/three-globe@2.24.13/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe@2.24.13/example/img/earth-topology.png"
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.15}
        showGraticules={false}
        pointsData={points}
        pointLabel="name"
        pointLat="lat"
        pointLng="lng"
        pointColor={d => d.currentColor || d.color}
        pointAltitude={0.01}
        pointRadius={d => d.currentSize ?? 2}
        pointResolution={64}
        pointsMerge={false}
        pointsTransitionDuration={0}
        customThreeObject={customPointRender}
        onGlobeReady={() => {
          if (locations.length > 0) {
            const currentLocation = locations[currentLocationIndex];
            globeRef.current.pointOfView({
              lat: currentLocation.lat,
              lng: currentLocation.lng,
              altitude: 2.5
            }, 0);
          }
        }}
        onPointClick={(point) => {
          // Najdi indeks lokacije in pošlji callback
          const index = locations.findIndex(
            loc => loc.lat === point.lat && loc.lng === point.lng
          );
          if (index !== -1) {
            onLocationChange(index);
          }
        }}
      />
    </div>
  );
}
