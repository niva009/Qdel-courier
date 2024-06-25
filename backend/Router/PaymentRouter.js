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
            console.error(`Business with ID ${id} not found`);
            return res.status(404).json({ message: 'Object not found', success: false, error: true });
        }

        // Extract the necessary fields from the invoice
        const { totalPrice, smsCharge = 0, pickupCharge = 0, extraSecurityCharge = 0 } = data.Invoice;

        // Log the values to debug

        // Parse values to float and validate
        const parsedTotalPrice = parseFloat(totalPrice) || 0;
        const parsedSmsCharge = parseFloat(smsCharge) || 0;
        const parsedPickupCharge = parseFloat(pickupCharge) || 0;
        const parsedExtraSecurityCharge = parseFloat(extraSecurityCharge) || 0;

        // Log the parsed values

        // Calculate the grand total
        const grandTotal = parsedTotalPrice + parsedSmsCharge + parsedPickupCharge + parsedExtraSecurityCharge;
        console.log('Grand Total:', grandTotal);

        if (isNaN(grandTotal) || grandTotal <= 0) {
            console.error('Invalid grand total calculated:', grandTotal);
            return res.status(400).json({ message: 'Invalid grand total calculated', success: false, error: true });
        }

        const options = {
            amount: Math.round(grandTotal * 100), // Convert to smallest currency unit and ensure it's an integer
            currency: 'INR',
            receipt: receiptId, // Using nanoid-generated unique receipt ID
            payment_capture: 1 // 1 for automatic capture, 0 for manual
        };

        // Create the Razorpay order
        const order = await razorpay.orders.create(options);
        res.json(order);
        console.log('Razorpay Order:', order);
    } catch (error) {
        console.error('Error creating order:', error.message, error.stack);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = PaymentRouter;


module.exports = PaymentRouter;
