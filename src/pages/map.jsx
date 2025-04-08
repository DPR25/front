import React from 'react';
import MapExample from '../assets/partials/MapExample';

export default function Map() {
  return (
    <div className="w-full min-h-screen bg-[#131518] p-8">
      <div className="max-w-6xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-6">Map of Slovenia</h1>
        <div className="bg-[#1e2126] p-6 rounded-lg shadow-xl">
          <MapExample />
        </div>
      </div>
    </div>
  );
} 