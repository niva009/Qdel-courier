import React, { useEffect, useState } from 'react';
import './delivery.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct the import for jwt-decode

const RouteInfo = () => {
  const [data, setData] = useState([]);
  let userId;

  const token = localStorage.getItem('token');
  let district;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      district = decoded.district;
      userId = decoded.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    if (district) {
      axios.get(`http://localhost:3001/api/deliveryWindow/${district}`)
        .then(response => {
          setData(response.data.data);
        })
        .catch(error => {
          console.log(error, 'error');
        });
    }
  }, [district]);

  console.log(data, "data from kannur");

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/userapproval/userapproval/${id}`,{
        userId: userId
      });
      console.log(response.data); // Assuming your backend returns the updated data
      window.location.reload();
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  console.log('data in approval page', data);

  return (
    <div>
      <h2 style={{ textAlign: 'center', padding: '20px 0px' }}>Total Orders Waiting for Confirmation</h2>
      {data.map((item, index) => (
        <div key={index} className="route-info">
          <div className="route-info-left">
            <h4 className="from">{item.pickup.from_name}</h4>
            <p className="from-address">{item.pickup.from_address},</p>
            <p className="from-address">{item.pickup.from_zipcode},</p>
            <p className="from-address">{item.pickup.from_district},</p>
            <p className="from-address">{item.pickup.from_phone_number},</p>
            <p className="from-address">{item.pickup.from_state},</p>
          </div>
          <div className="route-info-center">
            <div className="line">
              <div className="distance">{item.distance ? `${item.distance.toFixed(2)} km` : ''}</div>
              <div className="time">{item.price ? ` ${item.price} Rs` : ''}</div>

            </div>
          </div>
          <div className="route-info-right">
            {item.nearestWarehouse ? (
              <>
                <h4 className="to">{item.nearestWarehouse.name}</h4>
                <p className="to-address">{item.nearestWarehouse.address}</p>
                <p className="to-address">{item.nearestWarehouse.zipcode}</p>
                <p className="to-address">{item.nearestWarehouse.district}</p>
                <p className="to-address">{item.nearestWarehouse.state}</p>
              </>
            ) : (
              <p>No nearby warehouse found</p>
            )}
          </div>
          <div className="button-group">
            <button className="approve-button" onClick={() => handleApprove(item.pickup._id)}>Accept</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteInfo;
