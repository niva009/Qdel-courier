const express = require('express')
const BusinessRouter = express.Router();
const BusinessDb = require('../models/BusinessCourierModal')
const axios = require('axios');
const ChargeDb = require('../models/ChargeModal')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const StateDb = require('../models/StatePriceSchema');
const vision = require('@google-cloud/vision');


BusinessRouter.post('/business', (req, res) => {

    const data = new BusinessDb({
        from_name: req.body.from_name,
        from_phone_number: req.body.from_phone_number,
        from_state: req.body.from_state,
        from_address:req.body.from_address,
        from_zipcode: req.body.from_zipcode,
        from_district: req.body.from_district,
        from_vat_id: req.body.from_vat_id,
        to_name: req.body.to_name,
        to_phone_number: req.body.to_phone_number,
        to_state: req.body.to_state,
        to_address: req.body.to_address,
        to_zipcode: req.body.to_zipcode,
        to_district: req.body.to_district,
        user_id: req.body.user_id,
        to_vat_id: req.body.to_vat_id,
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
        from_district: req.body.from_district,
        from_vat_id: req.body.from_vat_id,
        to_name: req.body.to_name,
        to_phone_number: req.body.to_phone_number,
        to_state: req.body.to_state,
        to_address: req.body.to_address,
        to_district: req.body.to_district,
        user_id: req.body.user_id,
        to_vat_id: req.body.to_vat_id,
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

BusinessRouter.get('/pricedetails/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const geolocation = await BusinessDb.findOne({ _id: id });
      if (!geolocation) {
        return res.status(404).json({
          message: 'location data not found successfully',
          success: false,
          error: true
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
  
      let stateData = null;
      if (geolocation.to_state) {
        try {
          const stateInfo = await axios.get(`http://localhost:3001/api/getstate/${geolocation.to_state}`);
          stateData = stateInfo.data;
        //   console.log(stateData,"state information");
          console.log(stateData.data.basePricePerKm, "state data");
        } catch (stateError) {
          console.error('Error fetching state data:', stateError);
          return res.status(500).json({ error: 'An error occurred while fetching state data' });
        }
      } else {
        console.log("State data could not be fetched successfully");
      }

      const { standardPrice, expressStandardPrice, expressPremiumPrice } = calculatePrice(distance, geolocation.productionDescription, stateData);
      console.log('Distance:', distance);
      console.log('Duration:', duration);
      res.json({
        distance,
        duration,
        standardPrice,
        expressStandardPrice,
        expressPremiumPrice
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });
  
  function calculatePrice(distance, productionDescription, stateData) {
    const distanceInKm = parseFloat(distance.replace(' km', ''));
    const { weight, length, width, height } = productionDescription;
  
    // Example pricing logic
    const basePricePerKm = stateData.data.basePricePerKm; // Base price per km for standard
    const expressStandardMultiplier = stateData.data.expressStandardMultiplier; // Multiplier for express standard
    const expressPremiumMultiplier = stateData.data.expressPremiumMultiplier; // Multiplier for express premium
  
    const weightFactor = parseFloat(stateData.data.weightFactor); // Additional cost per kg
    const volumeFactor = parseFloat(stateData.data.volumeFactor); // Additional cost per cubic meter (length*breadth*height)
  
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

    BusinessDb.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Object not found', success: false, error: true });
            }

            // Update the nearestLocation and pickupDate keys
            data.Invoice.nearestLocation = nearestLocation;

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

BusinessRouter.post('/pickupdate/:id', (req, res) => {
    const id = req.params.id;
    const selectedDate = req.body.pickupDate;
    const smsCharge = req.body.smsCharge;
    const pickupCharge = req.body.pickupCharge;
    const extraSecurityCharge = req.body.extraSecurityCharge;
    const invoiceDate = req.body.invoiceDate;

    BusinessDb.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Object not found', success: false, error: true });
            }

            // Ensure Invoice field is initialized
            if (!data.Invoice) {
                data.Invoice = {
                    pickupDate: '',
                    smsCharge: '',
                    invoiceDate:'',
                    pickupCharge: '',
                    extraSecurityCharge: ''
                };
            }

            data.Invoice.pickupDate = selectedDate;
            data.Invoice.smsCharge = smsCharge;
            data.Invoice.extraSecurityCharge = extraSecurityCharge;
            data.Invoice.pickupCharge = pickupCharge;
            data.Invoice.invoiceDate = invoiceDate;

            return data.save();
        })
        .then(updatedData => {
            res.status(200).json({ message: "Pickup date updated successfully", success: true, error: false, data: updatedData });
        })
        .catch(error => {
            console.error("Error saving data: ", error);
            res.status(500).json({ message: "Internal server error", success: false, error: true });
        });
});

BusinessRouter.put('/changeCharge', async(req,res) =>{

    try{

        const { pricePerKm,PricePerKg,pricePerVolume,expressStandardMultiplier,expressPremiumMultiplier} = req.body;

        const UpdateData ={pricePerKm,PricePerKg ,pricePerVolume,expressStandardMultiplier,expressPremiumMultiplier}
        const result = await ChargeDb.findOneAndUpdate({},UpdateData,{ new:true, upsert: true})
        res.status(200).json({
            success: true,
            message: 'Prices updated successfully',
            data: result
        });
    }
    catch(error){
        console.log(error,"error in charge update");
        res.status(400).json({ success:false,message:'error occeared in updating charge information',error:error.message})
    }

})

// Initialize Google Vision client



// Initialize Google Vision client
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '../Config/default.json') // Path to your service account key file
  });
  
// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '/public/card/');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}
  
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });
  
// Define the route for image processing
BusinessRouter.post('/image-processing', upload.array('uploadedImages', 2), async (req, res) => {
    const files = req.files;
  
    if (!files || files.length !== 2) {
        return res.status(400).json({ message: "Must upload front and back portion of image", success: false, error: true });
    }
  
    try {
        const frontImagePath = files[0].path;
        const backImagePath = files[1].path;
  
        // Use Google Vision API to detect text in the images
        const [frontResult] = await client.textDetection(frontImagePath);
        const [backResult] = await client.textDetection(backImagePath);
  
        const frontDetections = frontResult.textAnnotations;
        const backDetections = backResult.textAnnotations;
  
        console.log(frontDetections, "Data from front page");
        console.log(backDetections, "Data from back page");
  
        // Extract the text (the first element in the detections array contains the full text)
        const frontText = frontDetections.length ? frontDetections[0].description : '';
        const backText = backDetections.length ? backDetections[0].description : '';
  
        // Extract name, address, and pincode
        const name = extractName(frontText);
        const address = extractAddress(backText);
        const zipcode = extractPincode(backText);
  
        res.status(200).json({
            message: 'OCR processing complete',
            success: true,
            data: { name, address, zipcode }
        });
  
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Function to extract name from the front text
function extractName(frontText) {
    const regex = /Government of India\s*([\s\S]*?)(?=\n)/;
    const match = frontText.match(regex);
    return match ? match[1].trim() : 'Name not found';
}

// Function to extract address from the back text
function extractAddress(backText) {
  const regex = /Unique Identification Authority of India\s*([\s\S]*?)(?=\d{6})/
    const match = backText.match(regex);
    return match ? match[1].trim() : 'Text not found';
}

// Function to extract pincode from the back text
function extractPincode(backText) {
    const pincodeRegex = /\b\d{6}\b/;
    const match = backText.match(pincodeRegex);
    return match ? match[0] : 'Pincode not found';
}


/////////// to get all data from business db////////////////////////////////////////////////

BusinessRouter.get('/getallData',(req,res) =>{


    BusinessDb.find()

    .then(response =>{

        return res.status(200).json({ message:"business data found successfully", success:true, error:false,data:response})
    })
   .catch(error =>{ 
      res.status(400).json({ message:'data not found',success:true,error:false})
   }) 
})


////////////////////////////////update specific State price from Admin Side/////////////////////////////////

BusinessRouter.post('/state', async (req, res) => {
    const { name, basePricePerKm, expressStandardMultiplier, expressPremiumMultiplier, weightFactor, volumeFactor } = req.body;

    try {
        let state = await StateDb.findOne({ name: name });
        if (state) {
            // If the state exists, update it
            state.basePricePerKm = basePricePerKm;
            state.expressStandardMultiplier = expressStandardMultiplier;
            state.expressPremiumMultiplier = expressPremiumMultiplier;
            state.weightFactor = weightFactor;
            state.volumeFactor = volumeFactor;
            state = await state.save();
        } else {
            // If the state does not exist, create a new one
            state = new StateDb({
                name,
                basePricePerKm,
                expressStandardMultiplier,
                expressPremiumMultiplier,
                weightFactor,
                volumeFactor
            });
            state = await state.save();
        }
        res.status(200).json({ message: "State stored successfully", data: state, success: true, error: false });
    } catch (error) {
        res.status(500).json({ message: "State data not stored successfully", success: false, error: true });
    }
});
BusinessRouter.get('/getstate/:state', async (req, res) => {
    const stateName = req.params.state;
    try {
        if (stateName) {
            const data = await StateDb.findOne({ name: stateName });
            
            if (data) {
                res.status(200).json({ message: "State found successfully", data: data, success: true, error: false });
            } else {
                res.status(404).json({ message: "State not found", success: false, error: true });
            }
        } else {
            res.status(400).json({ message: 'Name not provided', success: false, error: true });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false, error: true });
    }
});


BusinessRouter.put('/priceupdation/:state', async(req,res) =>{

    const state = req.params.state;

    if(!state){
    res.status(400).json({message:'state data not present',success:false,error:true})
}

const {basePricePerKm, expressStandardMultiplier, expressPremiumMultiplier, weightFactor,volumeFactor} = req.body;

if(
    basePricePerKm === undefined || expressStandardMultiplier === undefined || expressPremiumMultiplier === undefined || weightFactor === undefined || volumeFactor === undefined
){
    return res.statusCode(404).json({message:"incomplete data provided", success:false, error:true});
}
     try{

        const updateData = await StateDb.findOneAndUpdate(
            {name:state},
            {
                basePricePerKm,expressStandardMultiplier,expressPremiumMultiplier,weightFactor,volumeFactor
            },
            {new:true}
        );

        if(!updateData){
            res.status.json(404).json({ message:"state not found",success:false,error:true});
        }
        res.status(200).json({ message:"updated successfully",success:true,error:false,data:updateData});
     }
     catch(error){
        res.status(500).json({message:"internal server error",success:false,error:true,})
     }
})


module.exports = BusinessRouter;
