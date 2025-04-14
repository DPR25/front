import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LocationsManager({ onLocationsLoaded, defaultLocationId }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/locations/all?status=done');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLocations(data);

        // Transform locations data for Earth component
        const locationsForEarth = data.map(location => ({
          lat: location.center[0], // longitude is first in center array
          lng: location.center[1], // latitude is second in center array
          color: location.job_id === defaultLocationId ? 'rgb(255, 0, 0)' : 'rgb(149, 255, 43)',
          name: `Location ${location.job_id.substring(0, 8)}`,
          size: location.job_id === defaultLocationId ? 3 : 2,
          opacity: 1,
          job_id: location.job_id,
          isSelected: location.job_id === defaultLocationId
        }));
        
        // Pass the locations to the parent component
        if (onLocationsLoaded) {
          onLocationsLoaded(locationsForEarth, data);
        }
        
        // If no default location is provided, navigate to the first location
        if (!defaultLocationId && data.length > 0) {
          navigate(`/dashboard/${data[0].job_id}`);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [onLocationsLoaded, defaultLocationId, navigate]);

  // This component doesn't render anything directly
  return null;
} 