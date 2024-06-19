const express = require('express');
const RateRouter = express.Router();
const axios = require('axios');

const apiKey = 'AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co';

RateRouter.post('/calculateShipping', async (req, res) => {
  try {
    const { fromlat, fromlon, tolat, tolon, weight, volumeWeight } = req.body;

    console.log(fromlat, fromlon, tolat, tolon, weight, volumeWeight);

    const origin = `${fromlat},${fromlon}`;
    const destination = `${tolat},${tolon}`;
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    // Fetch distance from Google Distance Matrix API
    const response = await axios.get(apiUrl);
    
    if (
      response.data &&
      response.data.rows &&
      response.data.rows[0] &&
      response.data.rows[0].elements &&
      response.data.rows[0].elements[0] &&
      response.data.rows[0].elements[0].distance &&
      response.data.rows[0].elements[0].distance.text
    ) {
      const distance = parseFloat(response.data.rows[0].elements[0].distance.text.replace(' km', ''));

      console.log('Distance:', distance);
      if (!isNaN(distance)) {
        let rate = 0;
        if (weight <= 6) {
          rate = weight * 30;
        } else {
          rate = weight * 60;
        }
        const BaseRate = 50;
        const Rate = BaseRate + rate;
        console.log(Rate, " Total rate ");
        res.json({ ratePerKg: rate });
      } else {
        console.log("Distance is not a number");
        res.status(400).json({ error: 'Distance is not a number' });
      }
    } else {
      console.log("Invalid response structure from Distance Matrix API");
      res.status(500).json({ error: 'Invalid response structure from Distance Matrix API' });
    }

  } catch (error) {
    console.error('Error calculating distance:', error);
    res.status(500).json({ error: 'Error calculating distance' });
  }
});

module.exports = RateRouter;
