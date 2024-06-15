import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getallData/getallData')
      .then((response) => {
        setData(response.data.data); 
      })
      .catch((error) => {
        console.log(error, "error information");
      });
  }, []); // Adding an empty dependency array to ensure the effect runs only once

  console.log(data, "data information");

  return (
    <>
      <h2>Test</h2>
      <div>
        {data.map((item) => (
          <div key={item._id}>
            <h3>From: {item.from_name}</h3>
            <p>Phone Number: {item.from_phone_number}</p>
            <p>State: {item.from_state}</p>
            <p>Address: {item.from_address}</p>
            {item.Invoice && (
              <>
                <h4>Invoice Details</h4>
                <p>Choosed Plane: {item.Invoice.choosedPlane}</p>
                <p>Total Price: {item.Invoice.totalPrice}</p>
                <p>Status: {item.Invoice.status}</p>
                <p>Invoice ID: {item.Invoice._id}</p>
                <p>Extra Security Charge: {item.Invoice.extraSecurityCharge}</p>
                <p>Invoice Date: {item.Invoice.invoiceDate}</p>
                <p>Pickup Charge: {item.Invoice.pickupCharge}</p>
                <p>Pickup Date: {new Date(item.Invoice.pickupDate).toLocaleDateString()}</p>
                <p>SMS Charge: {item.Invoice.smsCharge}</p>
                <p>Invoice Number: {item.Invoice.invoiceNumber}</p>
                <p>Tracking ID: {item.Invoice.trackingId}</p>
                <p>Payment Status: {item.Invoice.paymentStatus}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
