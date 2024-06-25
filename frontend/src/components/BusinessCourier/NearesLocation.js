import React, { useState, useEffect, startTransition } from 'react';
import axios from 'axios';
import './Locationpicker.module.css';
import { useNavigate } from "react-router-dom";

const NearestLocation = ({ formId, district }) => {
  const [districtData, setDistrictData] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ nearestLocation: "" });

  const navigate = useNavigate();

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

  const handleSubmit = () => {
    axios.post(`http://localhost:3001/api/date-location/${formId}`, location)
      .then((response) => {
        console.log(response.data, "response data");
        startTransition(() => {
          navigate('/billing');
        });
      })
      .catch(error => {
        console.log(error, "error saving data");
      });
  };

  return (
    <div className="container">
      <h5 style={{ margin: "30px 0px" }} className="title">Select Nearest Location</h5>
      <div>
        <select onChange={locationChange}>
          {districtData && districtData.length > 0 ? (
            districtData.map((loc, index) => (
              <option key={index} value={loc.name}>
                {loc.name}, {loc.address}, {loc.phone_number}, {loc.district}
              </option>
            ))
          ) : (
            <option>No locations available</option>
          )}
        </select>
      </div>
      {error && <p>{error}</p>}

      <button
        style={{ margin: "50px 0px", padding: '10px 60px', border: 'none', background: 'orange', color: 'white' }}
        onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default NearestLocation;
