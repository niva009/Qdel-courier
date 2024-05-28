import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavbarOne from '../NavbarOne';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BoxForm = () => {
  const [formData, setFormData] = useState({});
  const [ boxinfo, setBoxinfo] = useState({});
  const [ selectstate, setSelectState] = useState("option 1")
  const [ selectDate, setSelectedDate] = useState('');
  const [ district , setDistrict] = useState([]);


  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Function to format date
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Calculate estimated delivery date
  const estimatedDate = selectDate ? addDays(selectDate, 4) : null;

  useEffect(() => {
    const courierData = localStorage.getItem('courierForm_1');
    if (courierData) setFormData(JSON.parse(courierData));
  }, []);

  // retrive district data based on from distric





  useEffect(() => {
    // Check if selectDate is not null
    if (selectDate !== null) {
      localStorage.setItem('select-date', JSON.stringify(selectDate));
      
      // Calculate and store estimated delivery date
      const estimatedDate = addDays(selectDate, 4);
      localStorage.setItem('estimated-date', JSON.stringify(estimatedDate));
    }
  }, [selectDate]);

  const handleRadiochange = (value) =>{
    setSelectState(value);
    
  }

  
  const handlechange = (e) =>{
    const {name, value} =e.target;
    setBoxinfo({ ...boxinfo ,[name]:value });

    localStorage.setItem('box-info',JSON.stringify({...boxinfo, [name]: value}));
  };

  useEffect(() => {
    if (formData && formData.to_district) { // Check if formData and formData.to_district are defined
      fetch(`http://localhost:3001/api/district/${formData.to_district}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            setDistrict(data);
          }
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  }, [formData]); // Add formData to dependency array
  


  return (
    <div>
      <NavbarOne />
      <Container fluid style={{marginTop:'100px',  paddingTop: '20px', padding: '20px,40px', backgroundColor: '#c2b5a7', width: '100%' }}>
        <Row>
          <Col xs={5}>
            <label style={{ color: 'black', padding: '10px 0px' }}>From <LocationOnIcon /></label>
            {formData && (
              <>
                <p style={{ marginBottom: '0px' }}>{formData.from_name}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_address}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_city}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_zipcode}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_state}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_district}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_phone_number}</p>
              </>
            )}
          </Col>
          <Col xs={5}>
            <label style={{ color: 'black', padding: '10px 0px' }}>To <LocationOnIcon /></label>
            {formData && (
              <>
                <p style={{ marginBottom: '0px' }}>{formData.to_name}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_address}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_city}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_zipcode}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_state}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_district}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_phone_number}</p>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <div>
        <label style={{ fontSize: '26px' }}>Select Packaging</label>
      </div>
      <Container style={{paddingTop:'30px'}}>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="numberOfPackages">
                    <Form.Label>Number of Packages</Form.Label>
                    <Form.Control
                      type="number"
                      name="noOfPackages"
                      onChange={handlechange}
                      min= '0'
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="totalWeight">
                    <Form.Label>Total Weight (kg)</Form.Label>
                    <Form.Control
                      type="number"
                      name="totalWeight"
                      onChange={handlechange}
                      min='0'
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="length">
                    <Form.Label>Length (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="length"
                      min= '0'
                      onChange={handlechange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="breadth">
                    <Form.Label>Breadth (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="breadth"
                      onChange={handlechange}
                      min = "0"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="width">
                    <Form.Label>Width (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="width"
                      onChange={handlechange}
                      min = '0'
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <div>
        <div>
        <label style={{ fontSize: '23px' }}> Description of Content</label>
        </div>
        <Container>
          <Row>
            <Col>
           < Form.Group controlId="width">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="string"
                      name="description"
                      onChange={handlechange}
                      required
                    />
                  </Form.Group>
            </Col>
          </Row>
        </Container>
        <div>
          <label style={{ fontSize: '23px' }}>User Preference</label>

          <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
      >
        <FormControlLabel  onChange={()=> handleRadiochange("option1")}  value="option1"   control={<Radio />} label="Do you want to pick up your order?" />
        <FormControlLabel onChange={()=> handleRadiochange("option2")}  value='option2' control={<Radio />} label="I will drop it at the nearest location" />
      </RadioGroup>

      </FormControl>

        </div>
        <div>
          {selectstate === "option1" && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <h5>select Shipment date:</h5>
        <DatePicker
          selected={selectDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="d/MM/yyyy h:mm aa"
          timeCaption="Time"
          style={{ border: '2px solid blue', background: 'blue' }}
        />
      </div>

      {selectDate && (
        <div>
          <h5>Estimated Delivery date: {formatDate(estimatedDate)}</h5>
        </div>
      )}
    </div>
    )}
        </div>
        <div className="user_dropo">

        <div>
          {selectstate === "option2" && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <h5>select Shipment date:</h5>
        <DatePicker
          selected={selectDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="d/MM/yyyy h:mm aa"
          timeCaption="Time"
          style={{ border: '2px solid blue', background: 'blue' }}
        />
      </div>

      {selectDate && (
        <div>
          <h5>Estimated Delivery date: {formatDate(estimatedDate)}</h5>
        </div>
      
      )}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  marginBottom:'50px'}}>
  <h5 >Select nearest Location</h5>
  <div>
    {/* Display district data using dropdown */}
    <select style={{ height: '49px', width:'400px' }}>
  {district && district.data && district.data.length > 0 ? (
    district.data.map((location, index) => (
      <option key={index} value={location.name}>
        Shop Name: {location.name}<br />
        Phone Number: {location.phone_number}
        Address: {location.address}
      </option>
    ))
  ) : (
    <option disabled>Nearest Location are Not available</option>
  )}
</select>
  </div>
</div>

    </div>
    
    )}
        </div>
        </div>
    
      </div>
    </div>
  );
}

export default BoxForm;
