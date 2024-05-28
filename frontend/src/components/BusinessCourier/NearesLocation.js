import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Locationpicker.module.css';

const NearestLocation = ({ setOnSaveLocation, objectId, district }) => {
  const [districtData, setDistrictData] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ nearestLocation: "" });

  useEffect(() => {
    if (district) {
      fetch(`http://localhost:3001/api/district/${district}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setDistrictData(data.data);
          } else {
            setError('Failed to load district data');
          }
        })
        .catch(error => {
          console.error('Fetch error:', error);
          setError('Failed to load district data');
        });
    }
  }, [district]);

  const locationChange = (e) => {
    const { value } = e.target;
    setLocation({ nearestLocation: value });
  };

  const saveLocation = () => {
    if (objectId && location.nearestLocation) {

      console.log('object id',objectId);
      axios.post(`http://localhost:3001/api/date-location/${objectId}`, location)
        .then(response => {
          console.log("Location data updated successfully", response);
        })
        .catch(error => {
          console.error('Update error:', error);
        });
    } else {
      console.error('No location selected or missing objectId');
    }
  };

  useEffect(() => {
    if (setOnSaveLocation) {
      setOnSaveLocation(() => saveLocation);
    }
  }, [setOnSaveLocation, location]);

  return (
    <div className="container">
      <h5 className="title">Select Nearest Location</h5>
      <div>
        <select onChange={locationChange}>
          {districtData && districtData.length > 0 ? (
            districtData.map((loc, index) => (
              <option key={index} value={loc.name}>
                {loc.name}
              </option>
            ))
          ) : (
            <option>No locations available</option>
          )}
        </select>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NearestLocation;
