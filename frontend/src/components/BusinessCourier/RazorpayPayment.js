import React from 'react';

const RazorpayPayment = () => {

  const handlePayment = async () => {
    // Your backend should create an order and return the order_id
    const response = await fetch('/api/create-order', {
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
      name: 'Your Company Name',
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

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPayment;
