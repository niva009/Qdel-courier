import React, { useEffect, useState } from 'react';
import './delivery.css';
import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';


const RouteInfo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/api/courier')
        .then(response => {
          const filteredData = response.data.data.filter(item => item.status === "pending");
          setData(filteredData);
        })
        .catch(error => {
          console.log(error, 'error');
        });
    } catch (error) {
      console.log(error, 'error');
    }
  }, []);


  // const token = localStorage.getItem('token');
  // const decoded = jwtDecode(token);
  // const userId = decoded.id;

  // console.log(userId);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/userapproval/${id}`);
      console.log(response.data); // Assuming your backend returns the updated data
      window.location.reload();
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  console.log('data in approval page', data);

  return (
    <div>
        <h2 style={{ textAlign:'center',padding:'20px 0px'}}>Total Orders Waiting for Conformation</h2>

      {data.map((item, index) => (
        <div key={index} className="route-info">
          <div className="route-info-left">
            <h4 className="from">{item.formData.from_name}</h4>
            <p className="from-address">{item.formData.from_address},</p>
            <p className="from-address">{item.formData.from_zipcode},</p>
            <p className="from-address">{item.formData.from_city},</p>
            <p className="from-address">{item.formData.from_state},</p>
          </div>
          <div className="route-info-center">
            <div className="line">
              <div className="distance">{item.Distance ? item.Distance : ''}</div>
              <div className="time">{item.Duration ? item.Duration : ''}</div>
            </div>
          </div>
          <div className="route-info-right">
            <h4 className="to">{item.formData.to_name}</h4>
            <p className="to-address">{item.formData.to_address}</p>
            <p className="to-address">{item.formData.to_zipcode}</p>
            <p className="to-address">{item.formData.to_city}</p>
            <p className="to-address">{item.formData.to_state}</p>
          </div>
          <div className="button-group">
            <button className="approve-button" onClick={() => handleApprove(item._id)}>Accept</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteInfo;
