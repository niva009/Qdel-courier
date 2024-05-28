const express = require('express');
const RegisterRouter = express.Router();
const RegisterDb = require('../models/RegisterSchema');
const bcrypt = require("bcryptjs");
const LoginDb = require('../models/LoginSchema');


RegisterRouter.post('/', async (req, res) => {
    try {
    
        const oldUser = await LoginDb.findOne( {user_name : req.body.user_name})
        if(oldUser){
            return res.statusCode(400).json({ success: false , error:true, message:'userName already exist'})
        }

        const oldPhone = await RegisterDb.findOne({ phone_number: req.body.phone_number})
        if(oldPhone){
            return res.statusCode(400).json({ success: false, error: true, message:'phone_number already exist '})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        let log={
            user_name:req.body.user_name,
            password: hashedPassword,
            role :2
        };
     const result = await LoginDb(log).save();
        const user = ({
            login_id: result._id,
            name:req.body.name,
            phone_number:req.body.phone_number,
            address:req.body.address,
            zipcode:req.body.zipcode,
            state:req.body.state,
            user_name:req.body.user_name,
            password:hashedPassword,
        });

        const result2 = await RegisterDb(user).save();

        if (result2) {
            return res.status(201).json({ message: 'Form data saved successfully', data:result2, success: true, error: false });
        } else {
            return res.status(401).json({ success: false, error: true, message: 'Failed to register' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: true, message: 'Internal server error', err });
    }
});

RegisterRouter.get('/reg', (req, res) => {
    RegisterDb.find()
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                message: "registration data",
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


module.exports = RegisterRouter;