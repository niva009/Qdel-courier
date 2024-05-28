const express = require("express");
const BusinessOrderRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

// Modify the router function to accept Redis client as a parameter
module.exports = function(redisClient) {

    // POST endpoint to store form data in Redis
    BusinessOrderRouter.post('/dataPost', (req, res) => {
        const id = uuidv4();
        const FormData = req.body;
        FormData.id = id;

        // Store form data into Redis
        redisClient.set(id, JSON.stringify(FormData), (err, reply) => {
            if (err) {
                console.log('error storing data in Redis', err)
                return res.status(500).json({ message: "Internal server error", success: false, error: true })
            }
            console.log('form data stored in Redis')
            return res.status(200).json({ message: 'Redis data stored in database', success: true, error: false })
        });

        console.log("Temporary data stored:", FormData);
        
        // Send response
        res.status(200).json({ message: "Temporary data saved in database", data: FormData, success: true, error: false });
    });

    // GET endpoint to retrieve form data from Redis by ID
    BusinessOrderRouter.get('/getData/:id', (req, res) => {
        const id = req.params.id;

        // Retrieve data from Redis by ID
        redisClient.get(id, (err, reply) => {
            if (err) {
                console.error("Error retrieving data from Redis:", err);
                return res.status(500).json({ message: "Internal Server Error", success: false, error: true });
            }
            if (!reply) {
                return res.status(404).json({ message: "Data not found", success: false, error: true });
            }
            const formData = JSON.parse(reply);
            console.log("Retrieved data from Redis:", formData);
            res.status(200).json({ message: "Form data retrieved from Redis", data: formData, success: true, error: false });
        });
    });

    // GET endpoint to retrieve all stored temporary data from Redis
    BusinessOrderRouter.get('/getAllData', (req, res) => {
        // Retrieve all keys matching a pattern (e.g., all keys)
        redisClient.keys('*', (err, keys) => {
            if (err) {
                console.error("Error retrieving keys from Redis:", err);
                return res.status(500).json({ message: "Internal Server Error", success: false, error: true });
            }

            // Fetch data for each key
            const dataPromises = keys.map(key => {
                return new Promise((resolve, reject) => {
                    redisClient.get(key, (err, reply) => {
                        if (err) {
                            console.error("Error retrieving data from Redis:", err);
                            reject(err);
                        } else {
                            resolve(JSON.parse(reply));
                        }
                    });
                });
            });

            // Resolve all promises
            Promise.all(dataPromises)
                .then(data => {
                    console.log("Retrieved all data from Redis:", data);
                    res.status(200).json({ message: "All form data retrieved from Redis", data: data, success: true, error: false });
                })
                .catch(error => {
                    console.error("Error retrieving data from Redis:", error);
                    res.status(500).json({ message: "Internal Server Error", success: false, error: true });
                });
        });
    });

    return BusinessOrderRouter;
};
