import React from "react";
import Map from "./Map";

const Mapdata = () => {
  // Define your origin and destination coordinates here
  const origin = { lat: 11.7707268, lng: 75.5101999 }; // Example origin coordinates
  const destination = { lat: 11.5770042, lng: 75.626628 }; // Example destination coordinates

  // Render the Map component with the specified coordinates
  return (
    <div>
      <h1>Map Data</h1>
      <Map apiKey="AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co" origin={origin} destination={destination} />
    </div>
  );
};

export default Mapdata;
