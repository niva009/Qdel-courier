import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTooltip
} from "mdb-react-ui-kit";
import NavbarOne from "../NavbarOne";
import axios from 'axios';


export default function Bill() {

  const [data, setData] = useState('');
  const[priceDetail,setPriceDetail] = useState({

    pickupCharge: 0,
    smsCharge:0,
    totalPrice:0,
    extraSecurityCharge:0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('FormId');
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data && data.formId) {
        console.log(data.formId);
        setData(data.formId) // Use the stored form ID
      } else {
        console.error("formId not found in the stored data");
      }
    } else {
      console.error("No data found in localStorage for key 'FormId'");
    }
  }, []);

  useEffect(() => {
    if (data) {
      axios.get(`http://localhost:3001/api/getAddressData/${data}`)
        .then((response) => {
          setPriceDetail(response.data.data[0].Invoice);

        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [data]); 

  console.log(priceDetail,"price detailss");

  

  const handlePayment = async () => {
    try {
      // Your backend should create an order and return the order_id
      const response = await fetch(`http://localhost:3001/api/create-order/${data}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const order = await response.json();
  
      // Ensure order object has the correct amount
      if (!order.amount || typeof order.amount !== 'number' || order.amount < 100) {
        throw new Error('Invalid order amount received');
      }
  
      const options = {
        key: 'rzp_test_QUfWalFEmI7V4R', // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits (e.g., paise for INR)
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: function (response) {
          // This function handles the payment success response
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Qdel india private limited',
          email: 'qdelindia@gmail.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  const serviceCharges = [
    { name: 'qdel service Charge', price: priceDetail.totalPrice},
    { name: 'SMS Charge', price: priceDetail.smsCharge },
    { name: 'Extra Protection Charge', price: priceDetail.extraSecurityCharge },
    { name: 'Pickup Charge', price: priceDetail.pickupCharge },
  ];

  const totalAmount = serviceCharges.reduce((total, charge) => total + parseFloat(charge.price), 0);

  const boxStyle = {
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
    padding: '16px',
    border: '2px solid #007bff',
    borderRadius: '5px',
    marginTop: '12px',
  };

  const totalBoxStyle = {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    padding: '16px',
    border: '2px solid #000',
    borderRadius: '5px',
    marginTop: '24px',
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#f5f5f5" }}>
      <NavbarOne />
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="12" lg="10" xl="8">
          <MDBCard>
            <MDBCardBody className="p-md-5">
              <div>
                <h2 className="text-center">Total Price Amount</h2>
              </div>

              <div className="mt-4">
                {serviceCharges.map((charge, index) => (
                  <div key={index} style={boxStyle} className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="h5 mb-1">{charge.name}</span>
                      
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="h4 mx-1 mb-0">{charge.price} Rs</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={totalBoxStyle} className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="h5 mb-1">Total Amount</span>
                  <span className="small text-muted d-block">include Gst</span>
                </div>
                <div className="d-flex align-items-center">
                  <sup className="dollar font-weight-bold text-muted">$</sup>
                  <span className="h4 mx-1 mb-0">{totalAmount} rs</span>
                </div>
              </div>

              <div className="mt-5">
                <h4>Payment details</h4>
                <h6 className="mt-4 mb-3 text-primary text-uppercase">Total Payable Amount {totalAmount} Rs</h6>
                <MDBTooltip tag="span" title="Enter a valid email address for payment details" placement="right">
                  <MDBIcon icon="info-circle" className="text-primary ms-2" />
                </MDBTooltip>
                <button onClick={handlePayment} block size="lg" className="mt-3" style={{ backgroundColor: '#007bff', borderColor: '#007bff', fontWeight: 'bold',width:'100%',border:'none',color:'white',padding:'20px 0px' }}>
                  Proceed to payment <MDBIcon fas icon="long-arrow-alt-right" />
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
