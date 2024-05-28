import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const ShippingForm = () => {
  const [data, setData] = useState({
    pickuppin: '',
    deliverypin: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const [fromlat, setFromLat] = useState(null);
  const [fromlon, setFromLon] = useState(null);
  const [tolat, setToLat] = useState(null);
  const [tolon, setToLon] = useState(null);
  const [distance, setDistance] = useState(null);
  const [show, setShow] = useState(false);
  const [ result, setResult] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const apiKey = "AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const volumeWeight = (data.length * data.width * data.height) / 5000;
    setData({ ...data, volumeWeight: volumeWeight }); // Update the state with volumeWeight

    // Send form data and additional data to the server
    try {
      const response = await axios.post('http://localhost:3001/calculateShipping/calculateShipping', {
        ...data,
        volumeWeight: volumeWeight,
        fromlat: fromlat,
        fromlon: fromlon,
        tolat: tolat,
        tolon: tolon
      });

      // Handle response from backend (e.g., display shipping rate to user)
      console.log(response.data);
      setResult(response.data);
      // Set state to display shipping rate to user
    } catch (error) {
      console.error('Error calculating shipping:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  console.log(result,"result information");
  useEffect(() => {
    const fetchFromLocation = async () => {
      try {
        if (data && data.pickuppin) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.pickuppin}&key=${apiKey}`);
          const { lat, lng } = response.data.results[0].geometry.location;
          setFromLat(lat);
          setFromLon(lng);
        } else {
          console.log("Pickup pincode not found successfully");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFromLocation();
  }, [data.pickuppin]);

  useEffect(() => {
    const fetchToLocation = async () => {
      try {
        if (data && data.deliverypin) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.deliverypin}&key=${apiKey}`);
          const { lat, lng } = response.data.results[0].geometry.location;
          setToLat(lat);
          setToLon(lng);
        } else {
          console.log("Delivery pincode not found successfully");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchToLocation();
  }, [data.deliverypin]);

  console.log(fromlat, fromlon);
  console.log(tolat, tolon);
  console.log(data,"data value")

  return (
    <div className="shipping-form-container" style={{ paddingBottom:'70px'}}>

    
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{margin:' auto'}}>
         <h2 style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>Total Rate</h2>
        </Modal.Header>
        <Modal.Body  style={{ margin:'auto',}}>

        <h5 style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>Total charge : { result.ratePerKg} Rs </h5>
        <ul>
          <li>Factors such as insurance, parcel service enhancements, and box protection are being considered.</li>
          <li>Additional taxes may apply in accordance with regulatory requirements.</li>
          <li>These adjustments ensure the safety and security of your parcels.</li>
          <li>Thank you for your understanding and continued support.</li>
        </ul>
        </Modal.Body>
        <Modal.Footer>
          <button style={{ padding:"10px 30px",color:"white", background:"orange", border:'none'}} onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>


    <form onSubmit={handleSubmit} className="shipping-form">
      <div>
        <h2 style={{textAlign:'center',margin:'20px 0px'}}> <span style={{ color:'orange'}}> Shipping</span> Rates Calculator</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <label style={{ color:'black',fontWeight:'bolder',padding:'10px 0px'}} htmlFor="pickUpPin" className="label">
            Pick-up Area Pincode*
          </label><br/>
          <input style={{ padding:' 5px 40px' , border:'1px solid orange'}}
            type="text"
            id="pickUpPin"
            name='pickuppin'
            onChange={handleChange}
            className="input"
            placeholder='Enter 6 digit Pincode'
          />
        </div>
        <div>
          <label style={{ color:'black',fontWeight:'bolder',padding:'10px 0px'}} htmlFor="deliveryPin" className="label">
            Delivery Area Pincode*
          </label><br/>
          <input style={{ padding:' 5px 30px' , border: '1px solid orange' }}
            type="text"
            id="deliveryPin"
            name='deliverypin'
            onChange={handleChange}
            className="input"
            placeholder='enter 6 digit pincode'
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <label style={{ color:'black',fontWeight:'bolder',padding:'10px 0px'}} htmlFor="weight" className="label">
            Weight*(Kg)
          </label><br/>
          <input style={{ padding:' 5px 40px' , border:'1px solid black'}}
            type="text"
            id="weight"
            name='weight'
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label style={{ color:'black',fontWeight:'bolder',padding:'10px 0px'}} htmlFor="dimensions" className="label">
            Dimensions (Optional)
          </label><br/>
          <input style={{ padding:' 5px 10px' , width:'70px', border:'1px solid black',margin:'0px 10px'}}
            type="text"
            placeholder='length'
            name="length"
            onChange={handleChange}
            className="input"
          />
          <input style={{ padding:' 5px 10px' , width:'70px', border:'1px solid black',margin:'0px 10px'}}
            type="text"
            name="width"
            placeholder='width'
            onChange={handleChange}
            className="input"
          />
          <input style={{ padding:' 5px 10px' , width:'70px', border:'1px solid black',margin:'0px 10px'}}
            type="text"
            name="height"
            placeholder='height'
            onChange={ handleChange}
            className="input"
          />
        </div>
      </div>
      <button onClick={handleShow} style={{ display: 'block', margin: '0 auto', padding: '10px 30px', borderRadius: '10px', backgroundColor: 'orange', color: 'white', border: 'none', marginTop: '20px' }} type="submit" className="button">
  Calculate
</button>
    </form>
    </div>
  );
};

export default ShippingForm;