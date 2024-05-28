import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, } from 'mdb-react-ui-kit';
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import NavbarOne from '../components/NavbarOne';



export default function App() {


    const [decodedUserId, setDecodedUserId] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          setDecodedUserId(decodedToken.userId);
          console.log(decodedToken.userId);
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }, []);

    useEffect(()=>{
      console.log('decodedUserId:', decodedUserId);
      axios.get(`http://localhost:3001/api/orderhistory/${decodedUserId}`)
      .then((response)=>{ 
          setHistory( response.data.data);
      }).catch((error)=> console.log("error", error));
  },[decodedUserId]);

  console.log(history);


  return (  
    <div>
        < NavbarOne/>
    <MDBTable style={{marginTop:'90px'}}>
    <MDBTableHead dark>
  <tr>
    <th>Invoice Number</th>
    <th>Ship To</th>
    <th scope='col'>Tracking ID</th>
    <th scope='col'>Delivery Date</th>
    <th scope='col'>Status</th>
    <th scope='col'>Invoice</th>
  </tr>
</MDBTableHead>
<MDBTableBody>
        {Array.isArray(history) && history.map((order, index) => (
          <tr key={index}>
            <th scope='row'>{order?.invoiceNumber}</th>
            <td>{order?.formData?.to_name}</td>
            <td>{order?.trackingId}</td>
            <td>{order?.deliveryDate}</td>
            <td>Product Shipped</td>
            <td>
              <button style={{ padding: '10px 20px', background: '#32a852', color: 'white' }} type="button">
                View
              </button>
            </td>
          </tr>
        ))}
      </MDBTableBody>

    </MDBTable>
    </div>
  );
}