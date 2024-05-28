import React, { useState, useEffect } from 'react';

const MapWithDirections = () => {
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    // Function to initialize map and directions service
    const initializeMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 10.9545243, lng: 76.37530459999999 }, // San Francisco
        zoom: 8,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const renderer = new window.google.maps.DirectionsRenderer();
      renderer.setMap(map);
      setDirectionsRenderer(renderer);

      const origin = new window.google.maps.LatLng(10.9545243, 76.37530459999999 ); // San Francisco
      const destination = new window.google.maps.LatLng(11.5770042, 75.626628); // Los Angeles

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

    // Call initializeMap when Google Maps API is loaded
    script.addEventListener('load', initializeMap);

    // Clean up
    return () => {
      script.removeEventListener('load', initializeMap);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default MapWithDirections;