const express = require('express');
const CourierOrderRouter = express.Router();
const CourierDb = require('../models/CourierFormSchema');
const axios = require('axios');

CourierOrderRouter.post('/courier', async (req, res) => {
    try {
        const data = await CourierDb.create({
            from_name: req.body.from_name,
            from_phone_number: req.body.from_phone_number,
            from_address: req.body.from_address,
            from_state: req.body.from_state,
            from_district: req.body.from_district,
            from_city: req.body.from_city,
            from_zipcode: req.body.from_zipcode,
            to_name: req.body.to_name,
            to_phone_number: req.body.to_phone_number,
            to_address: req.body.to_address,
            to_state: req.body.to_state,
            to_district: req.body.to_district,
            to_city: req.body.to_city,
            to_zipcode: req.body.to_zipcode,
            userid: req.body.userId,
            noOfPackages: req.body.noOfPackages,
            totalWeight: req.body.totalWeight,
            length: req.body.length,
            breadth:req.body.breadth,
            width: req.body.width,
            description:req.body.description
        });
        await data.save();
        res.status(200).json({
            success: true,
            error: false,
            data:data,
            message: 'Courier data saved successfully'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: true,
            message: 'Form is not submitted properly',
            err: err
        });
    }
});

CourierOrderRouter.get('/courier', (req, res) => {
    CourierDb.find()
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                message: " courier data",
                data: data,
            });
        })
        .catch((error) => {
            console.error('Error fetching courier data:', error);
            res.status(500).json({
                success: false,
                error: true,
                message: "Failed to fetch courier data"
            });
        });
  });

  CourierOrderRouter.post("/update/:id", async (req, res) => {
    try {
      // console.log(req.body.name);
      const id = req.params.id;
      // console.log(id);
      const oldData = await CourierDb.findOne({
        _id: req.params.id,
      });
      const data = {
        from_name: req.body.from_name ? req.body.from_name : oldData.from_name,
        from_phone_number: req.body.from_phone_number ? req.body.from_phone_number : oldData.from_phone_number,
        from_address: req.body.from_address ? req.body.from_address : oldData.from_address,
        from_zipcode: req.body.from_zipcode ? req.body.from_zipcode : oldData.from_zipcode,
        from_state: req.body.from_state ? req.body.from_state : oldData.from_state,
        from_city: req.body.from_city ? req.body.from_city : oldData.from_city,
        to_name: req.body.to_name ? req.body.to_name : oldData.to_name,
        to_phone_number: req.body.to_phone_number ? req.body.to_phone_number : oldData.to_phone_number,
        to_address: req.body.to_address ? req.body.to_address : oldData.to_address,
        to_zipcode: req.body.to_zipcode ? req.body.to_zipcode : oldData.to_zipcode,
        to_state: req.body.to_state ? req.body.to_state : oldData.to_state,
        to_city: req.body.to_city ? req.body.to_city : oldData.to_city,

      };

  
      const updatedData = await CourierDb.updateOne({ _id: id }, { $set: data });
      console.log(updatedData);
      if (updatedData) {
        res.status(200).json({
          success: true,
          error: false,
          data: data,
          message: "data update successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          error: true,
          message: "data update failed",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: true,
        message: "data update failed",
        errorMessage: error,
      });
     console.log(error) ;
    }
  });


  CourierOrderRouter.post('/maindata', async (req, res) => {
    try {
        const { formData, boxinfo, pickupdate, deliveryDate, invoiceNumber, invoiceDate, trackingId } = req.body;

        if (!formData || !boxinfo || !pickupdate || !deliveryDate || !invoiceNumber || !invoiceDate || !trackingId) {
            return res.status(400).json({ message: 'Invalid request body', success: false, error: true });
        }

        const CourierData = await CourierDb.create({
            formData: formData,
            boxinfo: boxinfo,
            pickupdate: pickupdate,
            deliveryDate: deliveryDate,
            invoiceNumber: invoiceNumber,
            invoiceDate: invoiceDate,
            trackingId: trackingId
        });

        res.status(200).json({ message: "Courier form data saved successfully", data: CourierData, success: true, error: false });
    } catch (error) {
        res.status(400).json({ message: 'Formdata not saved successfully', success: false, error: true, errorMessage: error.message });
    }
});
// fetch data based on invoice number

CourierOrderRouter.get('/courierdata/:id', async (req, res) => {
  try {
    let invoiceNumber = req.params.id;
    const CourierData = await CourierDb.find({ invoiceNumber: invoiceNumber });

    if (!CourierData || CourierData.length === 0) {
      return res.status(404).json({ message: 'Invoice number not found', success: false });
    }

    return res.status(200).json({ message: 'Courier data found successfully', success: true, data: CourierData });
  } catch (error) {
    console.log('Error fetching courier data:', error);
    return res.status(500).json({ message: 'Failed to fetch data', success: false, error: true });
  }
});


//////////================ Fetch data BASED on Tracking Id=========//////////////////////////////////

CourierOrderRouter.get('/tracking/:id', async (req, res) => {
  try {
    let trackingId = req.params.id;
    const CourierData = await CourierDb.find({ trackingId: trackingId });

    if (!CourierData || CourierData.length === 0) {
      return res.status(404).json({ message: 'Tracking Id not found', success: false });
    }

    return res.status(200).json({ message: 'Courier data found successfully', success: true, data: CourierData });
  } catch (error) {
    console.log('Error fetching courier data:', error);
    return res.status(500).json({ message: 'Failed to fetch data', success: false, error: true });
  }
});

///////////////here data fetch based on courier model id in Qrpdf page///////////////

CourierOrderRouter.get('/invoice/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const result = await CourierDb.findById(id);
    console.log("result", result);
    if (!result) {
      return res.status(404).json({ message: 'Document not found', success: false, error: true });
    }
    res.status(200).json({ message: "Document found", success: true, error: false, data: result });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: true, message: "Internal server error" });
  }
});

CourierOrderRouter.get('/orderhistory/:id', async(req,res)=>{
  try{
    var user_id = req.params.id;
    const history = await CourierDb.find({ 'formData.user_id': user_id });
    if(history && history.length > 0){
      return res.status(200).json({ success: true, error:false, data:history, message:'user booking history retrived successfully'});
    }
    res.status(400).json({message: 'no history found'});
  }
  catch(error){
    return  res.status(500).json({ message:'server error', success:false, error: true})
  }
})

///////////////// store location data retrived from Review page /////// ///////

CourierOrderRouter.post('/location/:id', async (req, res) => {
  try {
    const invoiceNumber = req.params.id;

    // Find the courier form data by invoiceNumber
    const courierFormData = await CourierDb.findOne({ invoiceNumber });

    // Check if the courier form data exists
    if (!courierFormData) {
      return res.status(404).json({ message: 'Courier form data not found', success: false });
    }

    // Update the courier form data with location information
    courierFormData.fromlat = req.body.fromlat;
    courierFormData.fromlon = req.body.fromlon;
    courierFormData.tolat = req.body.tolat;
    courierFormData.tolon = req.body.tolon;

    // Save the updated courier form data
    await courierFormData.save();

    res.status(200).json({ message: 'Location information saved successfully', success: true, data: courierFormData });
  } catch (error) {
    res.status(400).json({ success: false, errorMessage: error, error: 'Could not save location information' });
  }
});


////////////////////////////// For  Retreving Distance and TIME ////////////////////////////// 

CourierOrderRouter.get('/calculate/:id', async (req, res) => {
  try {
      const invoiceNumber = req.params.id; 
      console.log(invoiceNumber,"umma")

      // Find the courier invoice data by invoice number
      const courierInvoice = await CourierDb.findOne({ invoiceNumber });

      // Check if the courier invoice data exists
      if (!courierInvoice) {
          return res.status(404).json({ message: 'Courier form data for location fetching not found', success: false });
      }

      const apiKey = 'AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co'; // Replace with your actual API key
      const origin = `${courierInvoice.fromlat},${courierInvoice.fromlon}`;
      console.log(origin);
      const destination = `${courierInvoice.tolat},${courierInvoice.tolon}`;
      console.log(destination);
      const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

      // Fetch distance and duration from Google Distance Matrix API
      const response = await axios.get(apiUrl);
      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;

      // Update courier invoice object with distance and duration
      courierInvoice.Distance = distance;
      courierInvoice.Duration = duration;

      // Save updated courier invoice data to the database
      await courierInvoice.save();

      console.log('Distance:', distance);
      console.log('Duration:', duration);
      res.json({ distance, duration });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

CourierOrderRouter.put('/userapproval/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateorderStatus = await CourierDb.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!updateorderStatus) {
      return res.status(404).json({ message: 'Connaught update status ' });
    }

    res.json(updateorderStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' , error});
  }
});


///////////////////////////// change status of order to deliver ///////////////////////////////

CourierOrderRouter.put('/deliverystatus/:id', async( req, res) => {

     const { id }= req.params;

     try{

      const delivery =  await CourierDb.findById(id);

      if (!delivery || delivery.status !== 'approved') {
        return res.status(400).json({ message: 'Courier not found or status is not approved' });
      }


            const deliveryStatus = await CourierDb.findByIdAndUpdate(
              id,
              { status : 'orderCullected'},
              { new : true}
            );

            if (!deliveryStatus) {
              return res.status(404).json({ message: 'Connaught update status ' });
            }
            res.json(deliveryStatus);
     }   
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' , error});
    }
})


//////////////////////////////change status to  handle to nearestlocation ////////////////////////////////

CourierOrderRouter.put('/deliverystatus/handlenearestloc/:id', async( req, res) => {

  const { id }= req.params;

  try{

   const delivery =  await CourierDb.findById(id);

   if (!delivery || delivery.status !== 'orderCullected') {
     return res.status(400).json({ message: 'Courier not found or status is not orderCullected' });
   }


         const nearest = await CourierDb.findByIdAndUpdate(
           id,
           { status : 'handle to nearest loc'},
           { new : true}
         );

         if (!nearest) {
           return res.status(404).json({ message: 'Connaught update status ' });
         }
         res.json(nearest);
  }   
  catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Server Error' , error});
 }
})

//////////////////Change Status to Delivered ////////////////////////////////////////

CourierOrderRouter.put('/deliverystatus/delivered/:id', async( req, res) => {

  const { id }= req.params;

  try{

          const delivered = await CourierDb.findByIdAndUpdate(
           id,
           { status : 'delivered'},
           { new : true}
         );

         if (!delivered) {
           return res.status(404).json({ message: 'Connaught update status ' });
         }
         res.json(delivered);
  }   
  catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Server Error' , error});
 }
})






  
module.exports = CourierOrderRouter;
