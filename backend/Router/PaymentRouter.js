const express = require('express');
const Razorpay = require('razorpay');
const PaymentRouter = express.Router();
const BusinessDb = require('../models/BusinessCourierModal'); // Adjust the path as necessary

const razorpay = new Razorpay({
  key_id: 'rzp_test_QUfWalFEmI7V4R',
  key_secret: 'H089Oz6KsmPix8So34s3VeAm'
});

PaymentRouter.post('/create-order/:id', async (req, res) => {
    const { nanoid } = await import('nanoid');
    const receiptId = nanoid(); // Generate a unique receipt ID

    const id = req.params.id;

    try {
        // Fetch the document from the database
        const data = await BusinessDb.findById(id);
        
        if (!data) {
            return res.status(404).json({ message: 'Object not found', success: false, error: true });
        }

        // Extract the necessary fields from the invoice
        const { totalPrice, smsCharge, pickupCharge, extraSecurityCharge } = data.Invoice;

        // Calculate the grand total
        const grandTotal = parseFloat(totalPrice) + parseFloat(smsCharge) + parseFloat(pickupCharge) + parseFloat(extraSecurityCharge);

        const options = {
            amount: grandTotal * 100, // amount in smallest currency unit (e.g., paise for INR)
            currency: 'INR',
            receipt: receiptId, // Using nanoid-generated unique receipt ID
            payment_capture: 1 // 1 for automatic capture, 0 for manual
        };

        // Create the Razorpay order
        const order = await razorpay.orders.create(options);
        res.json(order);
        console.log(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send(error);
    }
});

module.exports = PaymentRouter;
