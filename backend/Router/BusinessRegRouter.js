const express = require('express'); 
const multer = require('multer')
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
BusinessRouter.post('/businessreg', upload.single('aadhar_image')  ,async (req, res) => {

  let log={
    user_name:req.body.user_name,
    password: req.body.password,
    role :'0',
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
      state:req.body.state,
      district:req.body.district,
      aadhar_image: req.file.path,
      email: req.body.email,
      user_name: req.body.user_name,
    });

    await data.save(); // Wait for the save operation to complete

    res.status(200).json({
      message: 'business reg form saved successfully',
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

BusinessRouter.get('/warehouse', (req, res) => {
  BusinessDb.find()
      .then((data) => {
          res.status(200).json({
              success: true,
              error: false,
              message: " fetching warehouse data ",
              data: data,
          });
      })
      .catch((error) => {
          console.error('Error fetching warehouse data:', error);
          res.status(500).json({
              success: false,
              error: true,
              message: "Failed to fetch warehouse data "
          });
      });
});


BusinessRouter.put('/updateBusiness/:id', async (req, res) => {
  try {
    const id  = req.params;
    console.log( id , 'id information')
    
    // Update the role in the DeliveryDb model
    const updateBusiness = await BusinessDb.findByIdAndUpdate(
      id,
      { Role: '4' },
      { new: true },
    );

    if (!updateBusiness) {
      return res.status(404).json({ message: 'business partner not found' });
    }

    // Update the role in the LoginDb model
    const updatedLogin = await LoginDb.findOneAndUpdate(
      { _id: updateBusiness.login_id },
      { role: '4' },
      { new: true }
    );

    if (!updatedLogin) {
      return res.status(404).json({ message: 'Login data not found' });
    }

    res.json(updateBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

BusinessRouter.get('/:district', async (req, res) => {
  try {
    const district = req.params.district;
    const result = await BusinessDb.find({ district: district });
    if (!result || result.length === 0) { // Check if the result is empty
      return res.status(404).json({ message: 'District data not found', success: false, error: true });
    }
    res.status(200).json({ message: 'Data found', data: result, success: true, error: false });
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error', success: false, error: true });
  }
});





module.exports = BusinessRouter;
