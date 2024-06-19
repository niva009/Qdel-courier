const express = require('express');
const DeliveryPartnerWindow = express.Router();
const warehouseDb = require('../models/BusinessRegSchema');
const businessDb = require('../models/BusinessCourierModal');

DeliveryPartnerWindow.get('/deliveryWindow/:district', async (req, res) => {
    const district = req.params.district;

    if (!district) {
        return res.status(404).json({ message: "District data not provided in the URL", success: false, error: true });
    }
    
    try {
        // Query pickups based on the provided district
        const query = { from_district: district };
        const pickups = await businessDb.find(query);

        // If no pickups found for the district, return appropriate message
        if (!pickups || pickups.length === 0) {
            return res.status(404).json({ message: `No pickups from ${district} at the moment, please wait!`, success: false, error: true });
        }

        // Map over each pickup to find the nearest warehouse
        const pickupWithNearestWarehousePromises = pickups.map(async (pickup) => {
            // Check if Location and its properties exist
            if (pickup.Location && pickup.Location.fromlon && pickup.Location.fromlat) {
                // Extract pickup coordinates from the Location data
                const pickupCoords = [parseFloat(pickup.Location.fromlon), parseFloat(pickup.Location.fromlat)];

                // Perform geoNear aggregation to find the nearest warehouse
                const nearestWarehouse = await warehouseDb.aggregate([
                    {
                        $geoNear: {
                            near: { type: "Point", coordinates: pickupCoords },
                            distanceField: "dist.calculated",
                            spherical: true
                        }
                    },
                    { $limit: 1 }
                ]);

                const distance = nearestWarehouse[0] ? nearestWarehouse[0].dist.calculated / 1000 : null; // Convert meters to kilometers

                // Check if productionDescription and its properties exist
                const productionDescription = pickup.productionDescription || {};
                const weight = productionDescription.weight || 0;
                const length = productionDescription.length || 0;
                const width = productionDescription.width || 0;
                const height = productionDescription.height || 0;
                
                const price = calculatePrice(distance, length, width, height, weight);

                return {
                    pickup,
                    nearestWarehouse: nearestWarehouse[0],
                    distance,
                    price
                };
            } else {
                // If Location or its properties are missing, return pickup with null warehouse and distance
                return {
                    pickup,
                    nearestWarehouse: null,
                    distance: null,
                    price: null
                };
            }
        });

        // Resolve all promises and respond with the data
        const pickupWithNearestWarehouse = await Promise.all(pickupWithNearestWarehousePromises);

        res.status(200).json({
            message: `District data based on ${district}`,
            data: pickupWithNearestWarehouse,
            success: true,
            error: false,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: `Internal server error`, success: false, error: true });
    }
});

// Function to calculate price based on distance, weight, length, width, and height
function calculatePrice(distance, length, width, height, weight) {
    const basePricePerKm = 0.5; // Example base price per kilometer
    const weightFactor = 0.1; // Example weight factor per kg
    const volumeFactor = 0.05; // Example volume factor per cubic meter

    const volume = length * width * height; // Calculate volume in cubic meters
    const distancePrice = distance * basePricePerKm;
    const weightPrice = weight * weightFactor;
    const volumePrice = volume * volumeFactor;

    const totalPrice = distancePrice + weightPrice + volumePrice;

    return Math.round(totalPrice); // Return the rounded total price
}


////end point  to update order status and ////save user id

DeliveryPartnerWindow.put('/userapproval/:id', async (req, res) => {
    const orderId = req.params.id;
    const { userId } = req.body;

    try {
        const order = await businessDb.findById(orderId);

        console.log(order);

        if (!order) {
            return res.status(404).json({ message: 'Order not found', success: false, error: true });
        }

        order.Invoice.status = 'collected';
        order.Invoice.collectedBy = userId;

        await order.save();

        res.status(200).json({
            message: 'Order status updated successfully',
            data: order,
            success: true,
            error: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
});


/////////////////// order for specific user/////////////////////////////////


// Endpoint to fetch collected orders for a specific user
DeliveryPartnerWindow.get('/orderHistory/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const collectedOrders = await businessDb.find({ 'Invoice.collectedBy': userId });

        if (!collectedOrders || collectedOrders.length === 0) {
            return res.status(404).json({ message: `No orders collected by user ${userId}`, success: true, error: false });
        }

        res.status(200).json({
            message: `Order history for user ${userId}`,
            data: collectedOrders,
            success: true,
            error: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
});



////////////////delivery partner change status based on product status updation....///////////////////////////


DeliveryPartnerWindow.put('/status-updation/:id', async (req, res) => {

    const orderId = req.params.id;
    const { userId,status } = req.body;

    try {
        const order = await businessDb.findById(orderId);

        console.log(order);

        if (!order) {
            return res.status(404).json({ message: 'Order not found', success: false, error: true });
        }

        order.Invoice.status = status;
        order.Invoice.collectedBy = userId;

        await order.save();

        res.status(200).json({
            message: 'Order status updated successfully',
            data: order,
            success: true,
            error: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
});





module.exports = DeliveryPartnerWindow;
