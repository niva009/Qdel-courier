import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const DestinationMap = () => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const location = useLocation();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting current location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Extract destination coordinates from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tolat = parseFloat(params.get('tolat')); // Assuming fromlat in URL is the destination latitude
    const tolon = parseFloat(params.get('tolon')); // Assuming fromlon in URL is the destination longitude

    if (tolat && tolon) {
      setDestination({ lat: tolat, lon: tolon });
    } else {
      console.error('Invalid or missing coordinates in the URL');
    }
  }, [location.search]);

  console.log(currentLocation, "Current location information");
  console.log(destination, "Destination location information");

  useEffect(() => {
    const initializeMap = () => {
      if (!currentLocation || !destination) return; // Don't initialize map if locations are not available

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: currentLocation.lat, lng: currentLocation.lon },
        zoom: 8,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const renderer = new window.google.maps.DirectionsRenderer();
      renderer.setMap(map);

      const origin = new window.google.maps.LatLng(currentLocation.lat, currentLocation.lon);
      const dest = new window.google.maps.LatLng(destination.lat, destination.lon);

      new window.google.maps.Marker({
        position: origin,
        map: map,
        title: 'Current Location'
      });

      new window.google.maps.Marker({
        position: dest,
        map: map,
        title: 'Destination'
      });

      directionsService.route(
        {
          origin: origin,
          destination: dest,
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
  }, [currentLocation, destination]); // Include 'currentLocation' and 'destination' in the dependency array to initialize map when they change

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default DestinationMap;
