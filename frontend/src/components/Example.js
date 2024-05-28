import React, { useState } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
  const [distance, setDistance] = useState(null);

  const calculateDistance = async () => {
    const apiKey = 'AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co';
    const origin = '37.7749,-122.4194'; // San Francisco
    const destination = '34.0522,-118.2437'; // Los Angeles

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const result = response.data;
      const distanceInMeters = result.rows[0].elements[0].distance.value;
      setDistance(distanceInMeters);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      <button onClick={calculateDistance}>Calculate Distance</button>
      {distance && <p>Distance: {distance} meters</p>}
    </div>
  );
};

export default DistanceCalculator;