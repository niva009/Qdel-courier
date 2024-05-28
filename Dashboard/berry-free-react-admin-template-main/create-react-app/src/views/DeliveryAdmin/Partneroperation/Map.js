import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const MapWithDirections = () => {
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/invoice/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [id]); // Include 'id' in the dependency array to refetch data when 'id' changes

  useEffect(() => {
    const initializeMap = () => {
      if (!data) return; // Don't initialize map if data is not available

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: data.fromlat, lng: data.fromlon },
        zoom: 8,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const renderer = new window.google.maps.DirectionsRenderer();
      renderer.setMap(map);
      setDirectionsRenderer(renderer);
      console.log(directionsRenderer)

      const origin = new window.google.maps.LatLng(data.fromlat, data.fromlon); // Origin based on fetched data
      const destination = new window.google.maps.LatLng(data.tolat, data.tolon); // Destination based on fetched data

      new window.google.maps.Marker({
        position: origin,
        map: map,
        title: 'Origin'
      });

      new window.google.maps.Marker({
        position: destination,
        map: map,
        title: 'Destination'
      });

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            renderer.setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    };

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co&libraries=places`;
    script.async = true;
    script.addEventListener('load', initializeMap);
    document.body.appendChild(script);

    // Clean up
    return () => {
      script.removeEventListener('load', initializeMap);
      document.body.removeChild(script);
    };
  }, [data]); // Include 'data' in the dependency array to initialize map when 'data' changes

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default MapWithDirections;
