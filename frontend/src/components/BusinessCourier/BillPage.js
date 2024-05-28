import React from "react";
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


export default function Bill() {

    const handlePayment = async () => {
        // Your backend should create an order and return the order_id
        const response = await fetch('http://localhost:3001/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const order = await response.json();
    
        const options = {
          key: 'rzp_test_BhVKMS8PUhgik3', // Enter the Key ID generated from the Dashboard
          amount: order.amount, // Amount is in currency subunits (e.g., paise for INR)
          currency: order.currency,
          name: 'Qdel Courier Service',
          description: 'Test Transaction',
          order_id: order.id,
          handler: function (response) {
            // This function handles the payment success response
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: 'Your Name',
            email: 'your.email@example.com',
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
      };
  const serviceCharges = [
    { name: 'Qdel Courier Charge', price: 8350 },
    // { name: 'SMS Charge', price: 50 },
    // { name: 'Extra Protection Charge', price: 200 },
    // { name: 'Pickup Charge', price: 300 },
  ];

  const totalAmount = serviceCharges.reduce((total, charge) => total + charge.price, 0);

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
                      <sup className="dollar font-weight-bold text-muted">$</sup>
                      <span className="h4 mx-1 mb-0">{charge.price}</span>
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
                <MDBInput
                  label="Email address"
                  id="form3"
                  size="lg"
                  type="email"
                  className="mb-3"
                />
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
