const express = require('express');
const AddressRouter = express.Router();
const AddressDb = require('../models/AddressbookSchema');

AddressRouter.post('/address-book', (req, res) => {
    const { to_name, to_phone_number, to_address, to_state, to_zipcode, to_city, to_district, nickname, user_id ,to_vat_id, to_eoriNumber} = req.body;

    const data = new AddressDb({
        to_name: to_name,
        to_phone_number: to_phone_number,
        to_state: to_state,
        to_address: to_address,
        to_zipcode: to_zipcode,
        to_city: to_city,
        to_district: to_district,
        user_id: user_id,
        nickname: nickname,
        to_vat_id: to_vat_id,
        to_eoriNumber: to_eoriNumber
    });

    data.save()
        .then(savedData => {
            res.status(200).json({
                message: "Address data saved successfully",
                data: savedData
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error saving address data",
                error: error.message
            });
        });
});

AddressRouter.get( '/getdata', (req,res) =>{

    AddressDb.find()
    .then(data =>{
        res.status(200).json({ message:'address data fetched successfully',success: true, error:false, data:data});
    })
    .catch(error =>{
        res.status(400).json({ success:false, error:true, error: error})
    })
})

module.exports = AddressRouter;
