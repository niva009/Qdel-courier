import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import './ordertracking.css'
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



export default function OrderDetails6() {

    const[information, setInformation] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        // Define a function to fetch the tracking information
        const fetchTrackingInformation = async () => {
          try {
            if (id) { // Check if trackingid is truthy before making the API call
              const response = await axios.get(`http://localhost:3001/api/tracking/${id}`);
              // Set the information state with the data from the response
              setInformation(response.data.data[0]); // Log the response data, not the state
            }
          } catch (error) {
            console.log('Error:', error);
          }
        };
    
        // Call the fetchTrackingInformation function
        fetchTrackingInformation();

      }, [id]);

      console.log( information, 'info')
      console.log( information.invoiceNumber);
      console.log( information.status);

      const deliveryDate = new Date(information.deliveryDate);

      // Extract day, month, and year parts
      const day = deliveryDate.getDate();
      const month = deliveryDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
      const year = deliveryDate.getFullYear();
      
      // Create a formatted date string in the desired format (dd/mm/yyyy)
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;


      const steps = [
        'Order Collected',
        'Order Shipped',
        'Order in Route',
        'Order Delivered',
      ];

      const getActiveStep = () => {
        if (information && information.status === 'orderCollected') {
            return 0;
        } else if (information && information.status === 'handle to nearest loc') {
            return 1;
        } else if (information && information.status === 'order in route') {
            return 2;
        } else if (information && information.status === 'delivered') {
            return 3;
        }
    }
    
      
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#8c9eff" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-stepper text-black"
                style={{ borderRadius: "16px" }}
              >
                <MDBCardBody className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <MDBTypography tag="h5" className="mb-0">
                        INVOICE{" "}
                        <span className="text-primary font-weight-bold">
                         {information.invoiceNumber}
                        </span>
                      </MDBTypography>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">
                        Expected Arrival <span>{formattedDate}</span>
                      </p>
                      <p className="mb-0">
                        TRACKING ID{" "}
                        <span className="font-weight-bold">
                         {information.trackingId}
                        </span>
                      </p>
                    </div>
                    </div>

                    <Box sx={{ width: '100%' }}>
                       <Stepper activeStep={getActiveStep()} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                                 </Step>
                           ))}
                  </Stepper>
                   </Box>

          <div className="data-table">
          <div className="App">
            <table>
                <thead>
                <tr>
                    <th>Billing Address</th>
                    <th>Shipping Address</th>
                    <th>Billing Details</th>
                </tr>
                </thead>
                <tbody>
  <tr>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.from_name}</td>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.to_name}</td>
  </tr>
  <tr>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.from_phone_number}</td>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.to_phone_number}</td>
  </tr>
  <tr>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.from_address}, {information.formData && information.formData.from_city}, {information.formData && information.formData.from_state}, {information.formData && information.formData.from_zipcode}</td>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.to_address}, {information.formData && information.formData.to_city}, {information.formData && information.formData.to_state}, {information.formData && information.formData.to_zipcode}</td>
  </tr>
  <tr>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.from_district}</td>
    <td style={{ alignItems:'left',textAlign:'left',paddingLeft:'20px' }}>{information.formData && information.formData.to_district}</td>
  </tr>
</tbody>
            </table>
        </div>
          </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <div>
          </div>
        </MDBContainer>
      </section>
    </>
  );
}