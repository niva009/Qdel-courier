import React from 'react';

const RazorpayPayment = () => {

    const handlePayment = async () => {
        try {
          // Your backend should create an order and return the order_id
          const response = await fetch('http://localhost:3001/api/create-order/${6655a568a6ed1698b0621539}', {
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
        } catch (error) {
          console.error('Error initiating payment:', error);
          alert('Something went wrong. Please try again.');
        }
      };
      

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPayment;