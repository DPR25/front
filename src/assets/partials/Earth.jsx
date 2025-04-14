import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Globe from 'react-globe.gl';
import { MeshLambertMaterial, DoubleSide, TextureLoader, Mesh, SphereGeometry, MeshPhongMaterial } from 'three';



export default function Earth() {
  const globeRef = useRef(null);
  //const [landPolygons, setLandPolygons] = useState([]);
  const [points, setPoints] = useState([
    { lat: -3.4653, lng: -62.2159, color: 'rgb(149, 255, 43)', name: 'Amazonski deževni gozd', size: 2, offset: 0, opacity: 1 },
  ]);
  const location = useLocation();



  // Flickering effect
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

  // Rotate globe to point on route change
  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView({ lat: 0, lng: -180, altitude: 2.5 }, 0);

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
  }, [location.pathname]);

  // Globe ready - styling and cloud setup
  const handleGlobeReady = () => {
    const globe = globeRef.current;

    // Auto-rotate
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.0;

    // Add clouds
    const CLOUDS_IMG_URL = './clouds.png'; // Make sure this is in your public folder
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

    new TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new Mesh(
        new SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });

    // Set initial position
    globe.pointOfView({ lat: 0, lng: -180, altitude: 2.5 }, 0);
  };

  return (
    <div>
      <Globe
        ref={globeRef}
        animateIn={false}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
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
        onGlobeReady={handleGlobeReady}
      />
    </div>
  );
}
