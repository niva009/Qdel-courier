import React from 'react';
import {   MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';


export default function WarehouseRequest() {

  const navigate =useNavigate();



    const [ data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/warehouse/warehouse')
        .then((response)=>{
            const filteredData = response.data.data.filter(item => item.Role === "0")
            console.log(response);  
            setData(filteredData);
        })
        .catch((err)=>{
            console.log(err,'data getting error');
        })
    },[]);

  
    // Example usage:
    // sendEmail('recipient@example.com', 'Recipient Name');
    

    const handleClick = (id) => {
        axios.put(`http://localhost:3001/api/updateBusiness/${id}`)
        .then((response) => {
            console.log(response);
            window.location.reload();
            // Handle success response
        })
        .catch((error) => {
            console.error(error);
            // Handle error response
        });
    };

    const submitId = (id) =>{
      console.log(id);
      navigate(`/warehouse/warehouse-information/${id}`);

  };



  return (
    <div>
        <h2 style={{ textAlign:'center',padding:'20px 0px'}}>Ware House Approval Request</h2>
    <MDBTable align='middle'>

      <MDBTableHead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>name</th>
          <th scope='col'>Phone Number</th>
          <th scope='col'>Address</th>
          <th scope='col'>State</th>
          <th scope='col'>District</th>
          <th scope='col'>Userinfo</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.address}</td>
                        <td>{item.state}</td>
                        <td>{item.district}</td>
                        <td>
                        <button type="button" onClick={() =>submitId(item._id)} className="btn btn-primary btn-rounded" >view</button>
                        </td>
                        <td>
                        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => handleClick(item._id)}>Approvel</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Rejection</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
 </td>
</tr>
      ))}
      </MDBTableBody>
    </MDBTable>
    </div>
  );
}