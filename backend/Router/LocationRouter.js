const express = require('express');
const LocationDb = require('../models/locationSchema');

const LocationRouter = express.Router();

LocationRouter.post('/location', async (req, res) => {
  try {
    const data = await LocationDb.create({
      fromlat: req.body.fromlat,
      fromlon: req.body.fromlon,
      tolat: req.body.tolat,
      tolon: req.body.tolon,
      
    });

    await data.save();

    console.log(data);
    res.status(200).json({ message: 'Location information saved successfully', success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, errormessage:error, error: 'Could not save location information' });
  }
});

module.exports = LocationRouter;