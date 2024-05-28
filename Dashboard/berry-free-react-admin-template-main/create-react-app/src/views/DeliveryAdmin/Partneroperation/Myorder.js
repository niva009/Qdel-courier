import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

export default function DeliveryMyorder() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleTrack = (_id) => {
    navigate(`/map/${_id}`);
    console.log("Tracking item with ID:", _id);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/courier?status=approved')
      .then((response) => {
        const filteredData = response.data.data.filter(item => item.status === 'approved');
        setData(filteredData);
        console.log(filteredData);
      })
      .catch((err) => {
        console.log(err, 'data getting error');
      });
  }, []);

  const handleOrderCullected = (id) => {
    console.log("Order Cullected with ID:", id);
    axios.put(`http://localhost:3001/api/deliverystatus/${id}`)
      .then((response) => {
        console.log('Order collected successfully', response);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const handleNearestLocation = (id) => {
    console.log("Order Cullected with ID:", id);
    axios.put(`http://localhost:3001/api/deliverystatus/${id}`)
      .then((response) => {
        console.log('Order handle nearestLocation ', response);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const handleDelivered = (id) => {
    axios.put(`http://localhost:3001/api/deliverystatus/delivered/${id}`)
      .then((response) => {
        console.log('Order delivered successfully', response);
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
          <th scope='col'>From Address</th>
          <th scope='col'>To Address</th>
          <th scope='col'>Status</th>
          <th scope='col'>Track</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.formData.from_name},{item.formData.from_address},{item.formData.from_zipcode},{item.formData.from_city}</td>
            <td>{item.formData.to_name},{item.formData.to_address},{item.formData.to_zipcode},{item.formData.to_city}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Change Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleOrderCullected(item._id)}>Order Collected</Dropdown.Item>
                  <Dropdown.Item href="#/action-2"  onClick={ () => handleNearestLocation(item._id)} >Handle to Nearest Location</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={ () => handleDelivered(item._id)} >Order Delivered</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td>
              <button type="button" className="btn btn-primary btn-rounded" onClick={() => handleTrack(item._id)}>Track Here</button>
            </td>
            <td></td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
