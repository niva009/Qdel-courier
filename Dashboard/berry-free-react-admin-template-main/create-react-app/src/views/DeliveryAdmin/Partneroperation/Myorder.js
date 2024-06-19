import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default function DeliveryMyorder() {
  const [data, setData] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let district = '';
  let userId = '';

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
        .then((response) => {
          const filteredData = response.data.data.filter(item => item.pickup && item.pickup.Invoice && item.pickup.Invoice.collectedBy === userId);
          setData(filteredData);

          // Initialize the statusMap with current status values
          const initialStatusMap = {};
          filteredData.forEach(item => {
            initialStatusMap[item.pickup._id] = item.pickup.Invoice.status || 'Change Status';
          });
          setStatusMap(initialStatusMap);
        })
        .catch((err) => {
          console.log(err, 'data getting error');
        });
    }
  }, [district, userId]);

  const handleOrderCollected = (id, status) => {
    axios.put(`http://localhost:3001/api/status-updation/${id}`, {
      userId: userId,
      status: status,
    })
      .then((response) => {
        console.log('Order status updated successfully', response);

        // Update the statusMap with the new status
        setStatusMap(prevStatusMap => ({
          ...prevStatusMap,
          [id]: status
        }));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>Track to Pickup Address</th>
          <th scope='col'>Pickup Address</th>
          <th scope='col'>Track to Delivery Address</th>
          <th scope='col'>Delivery Address</th>
          <th scope='col'>Status Update</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <AwesomeButton onPress={() => navigate(`/map/${item._id}?fromlat=${item.pickup.Location.fromlat}&fromlon=${item.pickup.Location.fromlon}`)}>Track to Pickup Point</AwesomeButton>
            </td>
            <td>{item.pickup.from_name},{item.pickup.from_address},{item.pickup.from_zipcode},{item.pickup.from_district}</td>
            <td>
              <AwesomeButton type='danger' onPress={() => {
                const [lon, lat] = item.nearestWarehouse.location.coordinates;
                navigate(`/DestinationMap?tolat=${lat}&tolon=${lon}`);
              }}>Track to Delivery Point</AwesomeButton>
            </td>
            <td>{item.nearestWarehouse.name},{item.nearestWarehouse.address},{item.nearestWarehouse.zipcode},{item.nearestWarehouse.district}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {statusMap[item.pickup._id] === 'collected' ? 'Change Status' : statusMap[item.pickup._id]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleOrderCollected(item.pickup._id, "Order Picked")}>Order Picked</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOrderCollected(item.pickup._id, "Handle to Nearest Location")}>Handle to Nearest Location</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOrderCollected(item.pickup._id, "Product Delivered")}>Product Delivered</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
