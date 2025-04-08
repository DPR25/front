import React, { useState } from 'react';
import MapComponent from './MapComponent';

export default function MapExample() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const handleMapClick = (location) => {
    setSelectedLocation(location);
    console.log("Location:", location);
  };

  return (
    <div className="map-example">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Interactive map of the world</h2>
      
      <MapComponent 
        center={[46.151241, 14.995463]}
        zoom={8}
        height="500px"
        width="100%"
        clickable={true}
        onMapClick={handleMapClick}
      />

      {selectedLocation && (
        <div className="mt-4 p-4 bg-[#252a30] text-gray-200 rounded-md border border-[#3a3e45]">
          <h3 className="font-semibold mb-2">Izbrana lokacija:</h3>
          <p>Lat: {selectedLocation.lat.toFixed(6)}</p>
          <p>Lng: {selectedLocation.lng.toFixed(6)}</p>
          <button 
            className="mt-2 px-4 py-2 bg-[#3056d3] text-white rounded hover:bg-[#2046c3] transition-colors"
            onClick={() => {
              alert("Action");
            }}
          >
            Action
          </button>
        </div>
      )}
    </div>
  );
} 