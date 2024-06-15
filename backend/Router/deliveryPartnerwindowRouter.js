const express = require('express');
const DeliveryPartnerWindow = express.Router();
const warehouseDb = require('../models/BusinessRegSchema');
const businessDb = require('../models/BusinessCourierModal');

DeliveryPartnerWindow.get('/deliveryWindow/:district', async (req, res) => {
    const district = req.params.district;

    if (!district) {
        return res.status(404).json({ message: "district data not from url", success: false, error: true });
    }
    
    try {
        const query = { from_district: district };
        const Pickup = await businessDb.find(query);
        const WareHouse = await warehouseDb.find({ district: district });

        if (!Pickup || Pickup.length === 0) {
            return res.status(404).json({ message: `no pickup from ${district} wait some time!!!!`, success: false, error: true });
        }

        res.status(200).json({
            message: `district data based on ${district}`,
            pickupData: Pickup,
            warehouseData: WareHouse,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({ message: `internal server error`, success: false, error: true });
    }
});



module.exports = DeliveryPartnerWindow;
