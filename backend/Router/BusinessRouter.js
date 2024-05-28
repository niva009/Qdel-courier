const express = require('express')
const BusinessRouter = express.Router();
const BusinessDb = require('../models/BusinessCourierModal')
const axios = require('axios');



BusinessRouter.post('/business', (req, res) => {

    const data = new BusinessDb({
        from_name: req.body.from_name,
        from_phone_number: req.body.from_phone_number,
        from_state: req.body.from_state,
        from_address:req.body.from_address,
        from_zipcode: req.body.from_zipcode,
        from_city: req.body.from_city,
        from_district: req.body.from_district,
        from_vat_id: req.body.from_vat_id,
        from_eoriNumber: req.body.from_eoriNumber,
        to_name: req.body.to_name,
        to_phone_number: req.body.to_phone_number,
        to_state: req.body.to_state,
        to_address: req.body.to_address,
        to_zipcode: req.body.to_zipcode,
        to_city: req.body.to_city,
        to_district: req.body.to_district,
        user_id: req.body.user_id,
        to_vat_id: req.body.to_vat_id,
        to_eoriNumber: req.body.to_eoriNumber,
        ProductDescription:{
            length: req.body.length,
            weight: req.body.weight,
            breadth:req.body.breadth,
            height:req.body.height,
            content: req.body.content,
            description: req.body.description,
            estimated_price:req.body.estimated_price
        }
    });

    data.save()
        .then(savedData => {
            res.status(200).json({
                message: "Business data saved successfully",
                data: savedData
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error saving Business data",
                error: error.message
            });
        });
});

BusinessRouter.get('/getAddressData/:id', async (req, res) => {
    try {
      let id = req.params.id;
      const addressData = await BusinessDb.find({ _id: id });
  
      if (!addressData || addressData.length === 0) {
        return res.status(404).json({ message: 'specif address data not found', success: false });
      }
  
      return res.status(200).json({ message: 'address data found successfully', success: true, data: addressData });
    } catch (error) {
      console.log('Error fetching address data:', error);
      return res.status(500).json({ message: 'Failed to fetch data', success: false, error: true });
    }
  });

BusinessRouter.put('/addressUpdate/:id', (req, res) => {
    const id = req.params.id;
    const updateData = {

        from_name: req.body.from_name,
        from_phone_number: req.body.from_phone_number,
        from_state: req.body.from_state,
        from_address: req.body.from_address,
        from_zipcode: req.body.from_zipcode,
        from_city: req.body.from_city,
        from_district: req.body.from_district,
        from_vat_id: req.body.from_vat_id,
        from_eoriNumber: req.body.from_eoriNumber,
        to_name: req.body.to_name,
        to_phone_number: req.body.to_phone_number,
        to_state: req.body.to_state,
        to_address: req.body.to_address,
        to_zipcode: req.body.to_zipcode,
        to_city: req.body.to_city,
        to_district: req.body.to_district,
        user_id: req.body.user_id,
        to_vat_id: req.body.to_vat_id,
        to_eoriNumber: req.body.to_eoriNumber,
        content: req.body.content,
        
        ProductDescription:{
            length: req.body.length,
            breadth:req.body.breadth,
            height:req.body.height,
            content:req.body.content,
            description: req.body.itemDescription,
            estimated_price: req.body.estimated_price,
        },
    };

    BusinessDb.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedData => {
            if (!updatedData) {
                return res.status(404).json({ message: "Business data not found" });
            }
            res.status(200).json({
                message: "Business data updated successfully",
                data: updatedData
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error updating Business data",
                error: error.message
            });
        });
});

/// to get latest information based on user id////////////////

BusinessRouter.get('/latest/:user_id', (req, res) => {
    const userId = req.params.user_id;

    BusinessDb.findOne({ user_id: userId }).sort({ _id: -1 }).exec()
        .then(latestData => {
            if (!latestData) {
                return res.status(404).json({ message: "No business data found for this user_id" });
            }
            res.status(200).json({
                message: "Latest business data retrieved successfully",
                data: latestData
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error retrieving business data",
                error: error.message
            });
        });
});

///////////// update product description data ///////////////////////////////////

BusinessRouter.put( '/productionDescription/:id' ,( req,res) =>{
    const id = req.params.id;

    const UpdatedProductionDescription ={
        
        length: req.body.length,
        width:req.body.width,
        height:req.body.height,
        description:req.body.description,
        content:req.body.content,
        estimated_price:req.body.estimated_price,
        weight:req.body.weight,
    }

    BusinessDb.findByIdAndUpdate(
        
        id,
        { productionDescription : UpdatedProductionDescription},
        { new : true, runValidators: true},
    )
    .then(updatedData =>{
        if(!updatedData){
            return res.status(404).json({ message:'production data not found', success:false,error:true})
        }
        res.status(200).json({ success:true, error:false, message:'productDescription updated successfully'})
    })
    .catch(error =>{
        res.status(500).json({ success:false, error:true, message:'error updating productDescription', error: error.message})
    })
   
})

///////////////////////////update location data //////////////////////////////////////////////

BusinessRouter.put('/updategeometric/:id', (req, res) => {
    const id = req.params.id;

    const UpdateLocationData = {
        fromlat: req.body.fromlat,
        fromlon: req.body.fromlon,
        tolat: req.body.tolat,
        tolon: req.body.tolon
    };

    BusinessDb.findByIdAndUpdate(
        id,
        { $set: { Location: UpdateLocationData } },
        { new: true, runValidators: true }
    )
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: 'location information not saved', success: false, error: true });
        }
        res.status(200).json({ success: true, error: false, message: 'location information updated successfully', data: data });
    })
    .catch(error => {
        res.status(500).json({ success: false, error: true, message: 'error updating location information', error: error.message });
    });
});

BusinessRouter.get('/pricedetails/:id', async(req,res) =>{

    try{
    const id = req.params.id;
   const geolocation = await BusinessDb.findOne({_id:id})
   if (!geolocation) {
    return res.status(404).json({ message: 'location data not found successfully', success: false, error:true
     });

   }

    const apiKey = 'AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co';
    const origin = `${geolocation.Location.fromlat},${geolocation.Location.fromlon}`;
      console.log(origin);
      const destination = `${geolocation.Location.tolat},${geolocation.Location.tolon}`;
      console.log(destination);
      const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
      const response = await axios.get(apiUrl);
      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;

      geolocation.Location.Distance = distance;
      geolocation.Location.Duration = duration;
      await geolocation.save();

      const { standardPrice, expressStandardPrice, expressPremiumPrice } = calculatePrice(distance, geolocation.productionDescription);
      console.log('Distance:', distance);
      console.log('Duration:', duration);
      res.json({ 
        distance, 
        duration, 
        standardPrice, 
        expressStandardPrice, 
        expressPremiumPrice 
    });

}catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
}
   
})

function calculatePrice(distance,productionDescription ) {
    const distanceInKm = parseFloat(distance.replace(' km', ''));
    const { weight, length, width, height } = productionDescription;

    // Example pricing logic
    const basePricePerKm = 1.0; // Base price per km for standard
    const expressStandardMultiplier = 1.5; // Multiplier for express standard
    const expressPremiumMultiplier = 2.0; // Multiplier for express premium

    const weightFactor = 40; // Additional cost per kg
    const volumeFactor = 0.1; // Additional cost per cubic meter (length*breadth*height)

    const volume = length * width * height;

    const standardPrice = (basePricePerKm * distanceInKm) + (weightFactor * weight) + (volumeFactor * volume);
    const expressStandardPrice = standardPrice * expressStandardMultiplier;
    const expressPremiumPrice = standardPrice * expressPremiumMultiplier;

    return {
        standardPrice: standardPrice.toFixed(2), 
        expressStandardPrice: expressStandardPrice.toFixed(2), 
        expressPremiumPrice: expressPremiumPrice.toFixed(2)
    }; // Return price with 2 decimal points
}

//////to store price and invoice details/////////////////////////////
BusinessRouter.put('/updateinvoice/:id', (req, res) => {
    const id = req.params.id;

    const updatedinvoiceDetail = {
        choosedPlane: req.body.choosedPlane,
        totalPrice: req.body.totalPrice,
        nearestLocation: req.body.nearestLocation
    };

    BusinessDb.findByIdAndUpdate(
        id,
        { $set: { Invoice: updatedinvoiceDetail } },
        { new: true, runValidators: true }
    )
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: 'invoice information not saved', success: false, error: true });
        }
        res.status(200).json({ success: true, error: false, message: 'invoice information updated successfully', data: data });
    })
    .catch(error => {
        res.status(500).json({ success: false, error: true, message: 'error updating invoice information', error: error.message });
    });
});


BusinessRouter.post('/date-location/:id', (req, res) => {
    const id = req.params.id;
    const nearestLocation = req.body.nearestLocation;
    const pickupDate = req.body.pickupDate; // Ensure the case matches exactly

    // Validate and format the date (if necessary)
    const isValidDate = (date) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(date);
    };

    if (!isValidDate(pickupDate)) {
        return res.status(400).json({ message: "Invalid date format. Expected DD/MM/YYYY.", success: false, error: true });
    }

    BusinessDb.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Object not found', success: false, error: true });
            }

            // Update the nearestLocation and pickupDate keys
            data.Invoice.nearestLocation = nearestLocation;
            data.Invoice.pickupDate = pickupDate;

            console.log("Updated Invoice: ", data.Invoice); // Log to verify

            // Save the updated document
            return data.save();
        })
        .then(updatedData => {
            res.status(200).json({ message: "Nearest location and pickup date stored successfully", success: true, error: false, data: updatedData });
        })
        .catch(error => {
            console.error("Error saving data: ", error); // Log the error for debugging
            res.status(500).json({ message: "Data store failed", success: false, error: true, error: error });
        });
});

module.exports = BusinessRouter;



module.exports = BusinessRouter;