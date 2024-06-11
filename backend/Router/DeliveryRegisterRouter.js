const express = require('express'); 
const multer = require('multer');
const path = require('path');
const DeliveryRouter = express.Router();
const DeliveryDb = require('../models/DeliveryRegisterSchema');
const bcrypt = require("bcryptjs");
const LoginDb = require('../models/LoginSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, path.join(__dirname, '../uploads')); /////assign relative path to current directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage }).fields([
    { name: 'license_image', maxCount: 1 },
    { name: 'aadhar_image', maxCount: 1 },
    { name: 'user_image', maxCount: 1 }
]);

DeliveryRouter.post('/deliveryreg', async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({
                message: 'Multer error occurred',
                success: false,
                error: true,
                err: err,
            });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({
                message: 'An unknown error occurred',
                success: false,
                error: true,
                err: err,
            });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            let log = {
                user_name: req.body.user_name,
                password: hashedPassword,
                role: '0',
            };
            const result = await LoginDb(log).save();

            const generateSecretCode = () => {
                return Math.floor(1000 + Math.random() * 9000);
            };

            const SecretCode = generateSecretCode()

            const data = new DeliveryDb({
                login_id: result._id,
                name: req.body.name,
                phone_number: req.body.phone_number,
                email: req.body.email,
                address: req.body.address,
                license_number: req.body.license_number,
                user_name: req.body.user_name,
                password: hashedPassword,
                license_image: `${req.files['license_image'][0].filename}`,
                aadhar_image: `${req.files['aadhar_image'][0].filename}`,
                user_image: `${req.files['user_image'][0].filename}`,
                Role: "0",
                code:SecretCode
            });

            await data.save();

            res.status(200).json({
                message: 'Delivery reg form saved successfully',
                data: data,
                success: true,
                error: false,
            });
        } catch (error) {
            res.status(400).json({
                message: 'form data not saved',
                success: false,
                error: true,
                error: error,
            });
        }
    });
});

DeliveryRouter.get('/deliverlist', (req, res) => {
    DeliveryDb.find()
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                message: "delivery partner registration data",
                data: data,
            });
        })
        .catch((error) => {
            console.error('Error fetching registration data:', error);
            res.status(500).json({
                success: false,
                error: true,
                message: "Failed to fetch registration data"
            });
        });
});


DeliveryRouter.put('/updateDeliveryRole/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: "ID not present", success: false, error: true });
    }

    try {
        // First, update the Role in the DeliveryDb
        const updateDeliveryData = await DeliveryDb.findOneAndUpdate(
            { _id: id },
            { Role: 3 },
            { new: true }
        );

        if (!updateDeliveryData) {
            return res.status(404).json({ message: "Delivery record not found", success: false, error: true });
        }

        // Next, update the Role in the LoginDb using the login_id
        const loginId = updateDeliveryData.login_id;
        const updateLoginData = await LoginDb.findOneAndUpdate(
            { _id: loginId },
            { role: 3 },
            { new: true }
        );

        if (!updateLoginData) {
            return res.status(404).json({ message: "Login record not found", success: false, error: true });
        }

        res.status(200).json({
            message: 'Updated successfully',
            deliveryData: updateDeliveryData,
            loginData: updateLoginData,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message, success: false });
    }
});


////////////////////////////////for Reject Request //////////////////////////////



DeliveryRouter.put('/rejectDeliveryRole/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({ message: "ID not present", success: false, error: true });
    }

    try {
        // First, update the Role in the DeliveryDb
        const updateDeliveryData = await DeliveryDb.findOneAndUpdate(
            { _id: id },
            { Role: 6 },
            { new: true }
        );

        if (!updateDeliveryData) {
            return res.status(404).json({ message: "Delivery record not found", success: false, error: true });
        }

        // Next, update the Role in the LoginDb using the login_id
        const loginId = updateDeliveryData.login_id;
        const updateLoginData = await LoginDb.findOneAndUpdate(
            { _id: loginId },
            { role: 6 },
            { new: true }
        );

        if (!updateLoginData) {
            return res.status(404).json({ message: "Login record not found", success: false, error: true });
        }

        res.status(200).json({
            message: 'Updated successfully',
            deliveryData: updateDeliveryData,
            loginData: updateLoginData,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message, success: false });
    }
});





module.exports = DeliveryRouter;
