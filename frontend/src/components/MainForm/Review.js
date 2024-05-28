
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavbarOne from '../NavbarOne';
import { QRCodeSVG } from 'qrcode.react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';


function Review() {

  const [invoiceid, setInvoiceId] = useState(null);
  const [formData, setFormData] = useState([]);
  const [fromlat, setFromLat] = useState(null);
  const [fromlon, setFromLon] = useState(null);
  const [tolat, setToLat] = useState(null);
  const [tolon, setToLon] = useState(null);


  const apiKey = "AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co";


  useEffect(() => {
    const invoicenum = localStorage.getItem('invoicenumber');
    if (invoicenum) setInvoiceId(JSON.parse(invoicenum));
  }, []);

  useEffect(() => {
    if (invoiceid) {
      axios.get(`http://localhost:3001/api/courierdata/${invoiceid}`)
        .then((response) => {
          setFormData(response.data.data[0]);
        }).catch((error) => {
          console.log('error', error);
        })
    }
  }, [invoiceid]);

  // console.log('formdata', formData.formData.from_zipcode)




  useEffect(() => {
    const Location = async () => {
      try {
        if (formData && formData.formData && formData.formData.from_zipcode) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.formData.from_zipcode}&key=${apiKey}`);
        const { lat, lng } = response.data.results[0].geometry.location;
        setFromLat(lat); // Assuming these are the "from" latitude and longitude
        setFromLon(lng); // Assuming these are the "from" latitude and longitude
        

        }
        else{
          console.log("formData.formData or formData.formData.from_zipcode is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };

    Location();
  }, [formData]); 

  // for retriving latitude and longitude of  to_zipcode

  useEffect(() => {
    const Location = async () => {
      try {
        if (formData && formData.formData && formData.formData.to_zipcode) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.formData.to_zipcode}&key=${apiKey}`);
        const { lat, lng } = response.data.results[0].geometry.location;
        setToLat(lat); 
        setToLon(lng); 
        

        }
        else{
          console.log("formData.formData or formData.formData.to_zipcode is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };

    Location();
  }, [formData]); 

  useEffect(() => {
    const postData = async () => {
      if (fromlat && fromlon && tolat && tolon) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
          await axios.post(`http://localhost:3001/api/location/${invoiceid}`, {
            fromlat,
            fromlon,
            tolat,
            tolon
          });
          console.log('Location data posted successfully.');
          
          // After posting location data successfully, call axios.get
          await axios.get(`http://localhost:3001/api/calculate/${invoiceid}`);
          console.log('Calculation request sent successfully.');
        } catch (error) {
          console.error('Error posting location data:', error);
        }
      } else {
        console.log('Some variables are missing. Cannot post location data.');
      }
    };
  
    // Call the postData function
    postData();
  }, [fromlat, fromlon, tolat, tolon, invoiceid]);
  


  console.log("latitude and longitiude data", fromlat, fromlon);
  console.log("tolatitude and tolongitiude data", tolat, tolon);


  return (
    <>
      <NavbarOne />
      <div style={{ backgroundColor: 'blue', marginTop: '100px' }}>
        <h4 style={{ color: 'white' }}> Barcode & Tracking Id </h4>
      </div>
      <Container fluid style={{ paddingTop: '20px', padding: '40px', width: '100%' }}>
        <Row>
          <Col xs={5}>
            <label style={{ color: 'black', padding: '10px 0px' }}>From <LocationOnIcon /></label>
            {formData && formData.formData && (
              <>
                <p style={{ marginBottom: '0px' }}>{formData.formData.from_name}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.from_phone_number}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.from_address}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.from_state}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.from_zipcode}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.from_city}</p>
              </>
            )}
          </Col>
          <Col xs={5}>
            <label style={{ color: 'black', padding: '10px 0px' }}>To <LocationOnIcon /></label>
            {formData && formData.formData && (
              <>
                <p style={{ marginBottom: '0px' }}>{formData.formData.to_name}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.to_address}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.to_city}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.to_zipcode}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.to_state}</p>
                <p style={{ marginBottom: '0px' }}>{formData.formData.to_phone_number}</p><br></br>
              </>
            )}
          </Col>
          <Col xs={2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QRCodeSVG value={JSON.stringify(formData)} size={150} />
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Link to={`/pdfqrcode/${formData._id}`}>
          <button style={{ width: '100%', backgroundColor: '#c41416', color: 'white', border: '1px solid black', borderRadius: '5px' }}>Download PDF <FileDownloadIcon /></button>
        </Link>
      </div>
      <div style={{ backgroundColor: 'blue', marginTop: '20px' }}>
        <h4 style={{ color: 'white' }}> Invoices </h4>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
  <div>invoice</div>
  <Link to={`/invoicepdf/${formData._id}`}>
    <Button variant="contained">pdf</Button>
  </Link>
</div>



    </>
  )
}

export default Review;
