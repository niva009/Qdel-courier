
const express = require('express'); 
const multer = require('multer')
const DeliveryRouter = express.Router();
const DeliveryDb = require('../models/DeliveryRegisterSchema');
const bcrypt = require("bcryptjs");
const LoginDb = require('../models/LoginSchema')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage }).fields([
    { name: 'license_image',maxCount:1},
    { name: 'aadhar_image',maxCount:1},
    { name: 'user_image',maxCount:1}
  ]);

  DeliveryRouter.post('/deliveryreg', async (req, res) => {
    upload(req,res, async(err)=>{

   
      try {
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
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        
        let log={
          user_name:req.body.user_name,
          password: hashedPassword,
          role :'0',
      };
   const result = await LoginDb(log).save();

  
        const data = new DeliveryDb({
          login_id: result._id,
          name: req.body.name,
          phone_number: req.body.phone_number,
          email: req.body.email,
          address: req.body.address,
          license_number: req.body.license_number,
          user_name: req.body.user_name,
          password: hashedPassword,
          license_image: req.files['license_image'][0].path,
          aadhar_image: req.files['aadhar_image'][0].path,
          user_image: req.files['user_image'][0].path,
          Role: "0",
        });
  
        await data.save();
  
        res.status(200).json({
          message: 'Delivery reg form saved successfully',
          data: data,
          success: true,
          error: false,
        });
      } 
       catch (error) {
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
              message: " delivery partner registration data",
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
//for display specifc delivery partner information
DeliveryRouter.get('/delivery/:id', (req, res) => {
  const userId = req.params.id;
  DeliveryDb.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "User not found",
        });
      }
      res.status(200).json({
        success: true,
        error: false,
        message: "User details",
        data: user,
      });
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Failed to fetch user details",
      });
    });
});
DeliveryRouter.put('/updateRole/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update the role in the DeliveryDb model
    const updatedDeliveryPartner = await DeliveryDb.findByIdAndUpdate(
      id,
      { Role: '3' },
      { new: true }
    );

    if (!updatedDeliveryPartner) {
      return res.status(404).json({ message: 'Delivery partner not found' });
    }

    // Update the role in the LoginDb model
    const updatedLogin = await LoginDb.findOneAndUpdate(
      { _id: updatedDeliveryPartner.login_id },
      { role: '3' },
      { new: true }
    );

    if (!updatedLogin) {
      return res.status(404).json({ message: 'Login data not found' });
    }

    res.json(updatedDeliveryPartner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});





module.exports = DeliveryRouter;


