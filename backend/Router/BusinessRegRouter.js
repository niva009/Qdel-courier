const express = require('express'); 
const multer = require('multer');
const BusinessRouter = express.Router();
const BusinessDb = require('../models/BusinessRegSchema');
const LoginDb = require('../models/LoginSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/assets/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

BusinessRouter.post('/businessreg', upload.single('aadhar_image'), async (req, res) => {
    let log = {
        user_name: req.body.user_name,
        password: req.body.password,
        role: '0',
    };

    const result = await LoginDb(log).save();

    try {
        const data = new BusinessDb({
            login_id: result._id,
            name: req.body.name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            aadhar_number: req.body.aadhar_number,
            password: req.body.password,
            zipcode: req.body.zipcode,
            state: req.body.state,
            location: JSON.parse(req.body.location),
            district: req.body.district,
            aadhar_image: req.file.path,
            email: req.body.email,
            user_name: req.body.user_name,
        });

        await data.save(); // Wait for the save operation to complete

        res.status(200).json({
            message: 'Business reg form saved successfully',
            data: data,
            success: true,
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Form data not saved',
            success: false,
            error: true,
            error: error,
        });
    }
});

module.exports = BusinessRouter;
