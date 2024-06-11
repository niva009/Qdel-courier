import React from 'react';
import {   MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios'


export default function Deliverypartnerlist() {

    const [ data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/deliverlist?Role=3')
          .then((response) => {
            const filteredData = response.data.data.filter(item => item.Role === '3');
            setData(filteredData);
            console.log(filteredData);
          })
          .catch((err) => {
            console.log(err, 'data getting error');
          });
      }, []);
   

  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>UserImg</th>
          <th scope='col'>name</th>
          <th scope='col'>Phone Number</th>
          <th scope='col'>Address</th>
          <th scope='col'>User Info</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td> 
                        {item.user_image && (
                      <img width={'100px'} src={`http://localhost:3001/${item.user_image}`} alt={item.name} />
                        )}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.address}</td>
                        <td>
                        <button type="button" className="btn btn-primary btn-rounded" >view</button>
                        </td>
                        <td>
 </td>
</tr>
      ))}
      </MDBTableBody>
    </MDBTable>
  );
}