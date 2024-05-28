const express = require('express');
const Razorpay = require('razorpay');
const PaymentRouter = express.Router();


const razorpay = new Razorpay({
  key_id: 'rzp_test_BhVKMS8PUhgik3',
  key_secret: 'Nwn8y9Nj8OP0uE8Pv0DEdC0w'
});

PaymentRouter.post('/create-order', async (req, res) => {
    const { nanoid } = await import('nanoid');
    const receiptId = nanoid(); // Generate a unique receipt ID

  const options = {
    amount: 500 * 100, // amount in smallest currency unit (e.g., paise for INR)
    currency: 'INR',
    receipt: receiptId, // Using nanoid-generated unique receipt ID
    payment_capture: 1 // 1 for automatic capture, 0 for manual
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
    console.log(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = PaymentRouter;
