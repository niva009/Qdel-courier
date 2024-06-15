import React from 'react';
import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function App() {

    const [ data, setData] = useState([]);
  
    useEffect(()=>{
        axios.get('http://localhost:3001/api/getdata/registerInfo')
        .then((response)=>{
            setData(response.data.data)
            console.log(response.data);
        })
        .catch((err)=>{
            console.log(err,'data getting error');
        })
    },[]);


  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>Name</th>
          <th scope='col'>Phone Number</th>
          <th scope='col'>address</th>
          <th scope='col'>state</th>
          <th scope='col'>Actions</th>
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
                        <td>
                            <MDBBtn color='link' rounded size='sm'>
                                Edit
                            </MDBBtn>
                        </td>
                    </tr>
      ))}
      </MDBTableBody>
    </MDBTable>
  );
}