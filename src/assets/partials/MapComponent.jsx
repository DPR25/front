import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapClickHandler({ onClick, clickable }) {
  useMapEvents({
    click: (e) => {
      if (!clickable) return;
      onClick(e);
    }
  });
  return null;
}

export default function MapComponent({ 
  center = [46.056946, 14.505751],
  zoom = 13,
  markers = [],
  height = '400px',
  width = '100%',
  clickable = true,
  onMapClick = () => {}
}) {
  const [mapMarkers, setMapMarkers] = useState(markers);
  const [clickPosition, setClickPosition] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    setMapMarkers(markers);
  }, [markers]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setClickPosition({ lat, lng });
    onMapClick({ lat, lng });
  };

  return (
    <div className="map-container" style={{ height, width }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <MapClickHandler onClick={handleMapClick} clickable={clickable} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {mapMarkers.map((marker, idx) => (
          <Marker 
            key={idx} 
            position={[marker.lat, marker.lng]}
          >
            {marker.popup && (
              <Popup>
                {marker.popup}
              </Popup>
            )}
          </Marker>
        ))}
        
        {clickPosition && (
          <Marker position={[clickPosition.lat, clickPosition.lng]}>
            <Popup>
              Izbrana lokacija<br />
              Širina: {clickPosition.lat.toFixed(5)}<br />
              Dolžina: {clickPosition.lng.toFixed(5)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
} 