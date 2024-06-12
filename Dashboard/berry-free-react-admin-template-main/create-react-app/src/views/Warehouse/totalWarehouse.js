import React from 'react';
import {   MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';



export default function WarehouseRequest() {


    const [ data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/warehouse/warehouse')
        .then((response)=>{
            const filteredData = response.data.data.filter(item => item.Role === "4")
            console.log(response);  
            setData(filteredData);
        })
        .catch((err)=>{
            console.log(err,'data getting error');
        })
    },[]);

  
  return (
    <div>
        <h2 style={{ textAlign:'center',padding:'20px 0px'}}>Total Ware House</h2>
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
                        <button type="button" className="btn btn-primary btn-rounded" >view</button>
                        </td>

                </tr>
                    ))}
                    </MDBTableBody>
                    </MDBTable>
                    </div>
                );
                }