import React from 'react';
import {   MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import emailjs from 'emailjs-com';


export default function Deliverypartnerlist() {


    const [ data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/api/deliverlist')
        .then((response)=>{
            const filteredData = response.data.data.filter(item => item.Role === '0');
            setData(filteredData);
        })
        .catch((err)=>{
            console.log(err,'data getting error');
        })
    },[]);
    // console.log(filteredData);

    const sendEmail = (email, name) => {
      // Replace these with your actual EmailJS service ID, template ID, and user ID
      const serviceId = 'service_nibll0l';
      const templateId = 'template_uhw44ms';
      const userId = '6YJ6nE8MVaAiQDs06';


      console.log(email);
    
      // Create a templateParams object with the email, name, and approval message
      const templateParams = {
        to_email: email,
        to_name: name,
        message: `Your qdel deliverypartner account has been approved by the admin.`
      };
    
      // Send email using EmailJS
      emailjs.send(serviceId, templateId, templateParams, userId)
        .then((response) => {
          console.log('Email sent:', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    };
    
    // Example usage:
    // sendEmail('recipient@example.com', 'Recipient Name');
    

    const handleClick = (id, email, name,) => {
        axios.put(`http://localhost:3001/api/updateRole/${id}`)
        .then((response) => {
          sendEmail(email, name,); 

            console.log(response.data._id);
            window.location.reload();
            // Handle success response
        })
        .catch((error) => {
            console.error(error);
            // Handle error response
        });
    };



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
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td> 
                        {item.user_image && (
                   <img src={item.user_image} alt={item.name} />
                        )}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.address}</td>
                        <td>
                        <button type="button" className="btn btn-primary btn-rounded" >view</button>
                        </td>
                        <td>
                        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => handleClick(item._id, item.email, item.name, item.phone_number)}>Approvel</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Rejection</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
 </td>
</tr>
      ))}
      </MDBTableBody>
    </MDBTable>
  );
}