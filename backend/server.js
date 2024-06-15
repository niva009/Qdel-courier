const express = require('express');
const App = express();
const mongoose = require('mongoose');
const redis = require('redis');
const path = require('path');
const cors = require('cors'); 

const RegisterRouter = require('./Router/RegisterRouter');
const  DeliveryRegisterRouter = require('./Router/DeliveryRegisterRouter');
const BusinessRegistration = require('./Router/BusinessRegRouter');
const LoginRouter = require('./Router/LoginRouter');
const CourierRegisterRouter = require('./Router/CourierOrderRouter')
const bodyParser = require('body-parser');
const RateRouter = require('./Router/RatecalculatorRouter')
const BusinessCourier = require( './Router/BusinessOrderRouter');
const AddressRouter = require( './Router/AddressRouter');
const BusinessRouter = require( './Router/BusinessRouter');
const PaymentRouter = require( './Router/PaymentRouter')
const DeliveryPartnerWindow = require('./Router/deliveryPartnerwindowRouter')

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002'];

App.use(cors());

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

App.use(cors(corsOptions));

const ngrok = require('ngrok');


const port = 3001
const Redis_Port = 6379;



App.use(bodyParser.json()); 
App.use(bodyParser.urlencoded({extended:true})); 

App.use(express.static('uploads'));


const redisClient = redis.createClient(Redis_Port);
redisClient.on('error', function(error) {
    console.error('RedisError', error);
});

mongoose.connect('mongodb+srv://qdeltest:qdel123@cluster0.uaasjez.mongodb.net/Qdel',{
}
)
.then(()=>console.log('database connected successfully'))
.catch((err)=>console.log('database connection failed',err))


App.get('/getdata', function( req,res){
    res.status(200).send({
        success: true,
        name: 'testing data',
        response: 'working'
    })
})


// wha
//static files

App.use('/api/register/', RegisterRouter);
App.use('/api/', DeliveryRegisterRouter );
App.use('/api/business/', BusinessRegistration);
App.use('/api/warehouse/', BusinessRegistration);///// fetch warehouse data
App.use('/api/', BusinessRegistration);///// update warehosue data and change role 4 data
App.use('/api/login',LoginRouter);
App.use('/api/getdata',RegisterRouter);
App.use('/api/',RegisterRouter);
App.use('/api/deliveryregistration',DeliveryRegisterRouter);/// to post deliverydb to databse 
App.use('/api/',CourierRegisterRouter);
App.use('/api/',CourierRegisterRouter);
App.use('/api/',CourierRegisterRouter);
App.use('/api/location/:id',CourierRegisterRouter);
App.use('/api/delivery/:id',DeliveryRegisterRouter);
App.use('/api/updateRole/:id',DeliveryRegisterRouter);
App.use('/api/deliverlist/',DeliveryRegisterRouter);
App.use('/api/calculate/:id',CourierRegisterRouter)
App.use('/api/district/',BusinessRegistration);
App.use('/api/maindata/',CourierRegisterRouter);// store full courier data  in db
App.use('/api/courierdata/:id',CourierRegisterRouter); // get courier data for review page
App.use('/api/invoice/id', CourierRegisterRouter); // get data based on courier id
App.use('/api/orerhistory/:id', CourierRegisterRouter); // get previos order based on user id
App.use('/api/userapproval/:id', CourierRegisterRouter); // get id to change status of courier data for delivery partner
App.use('/api/tracking/:id', CourierRegisterRouter); // get id to change status of courier data for delivery partner
App.use('/api/deliverystatus/:id', CourierRegisterRouter); // change status if delivery partner change status
App.use('/api/deliverystatus/handlenearestloc/:id', CourierRegisterRouter); // change status if delivery partner change status to nearest location
App.use('/api/deliverystatus/delivered/:id', CourierRegisterRouter); // change status if delivery partner change status to delivered
App.use('/calculateShipping', RateRouter); ///send rateinfo, weight , vweight  to Db
App.use( '/api/businessCourier/',BusinessCourier);
App.use( '/api/address/', AddressRouter);//for saving address book data into db
App.use( '/api/getdata/', AddressRouter);//for saving address book data into db
App.use( '/api/getdata/', AddressRouter);//for saving address book data into db
App.use( '/api/getAllData/', BusinessRouter); // for post data into business server http://localhost:3001/api/getAllData/business
App.use( '/api/', BusinessRouter);//////for updating address data  http://localhost:3001/api/addressUpdate
App.use( '/api/', BusinessRouter);/////// for getting latest data based on user_id http://localhost:3001/api/latest/660799f8dc25d725609e326e
App.use( '/api/', BusinessRouter);//////for get addressdata for update page http://localhost:3001/api/getAddressData/66472de7ea02aa1c2e71d278
App.use( '/api/', BusinessRouter);////////for Updatating production description 
App.use( '/api/', BusinessRouter);////////for Updatating locationinformation  http://localhost:3001/api/updategeometric/id
App.use( '/api/', BusinessRouter);/////////////for get price detail ////////////////
App.use( '/api/', BusinessRouter);///////////////to update billing details http://localhost:3001/api/updateinvoice/id
App.use( '/api/', BusinessRouter);//////////to store nerest location and pickup date http://localhost:3001/api/date-location/id
App.use( '/api/', PaymentRouter);/////////////for payment integration/////////////////////////
App.use( '/api/', BusinessRouter); /////// http://localhost:3001/api/pckupdate/id    for saving data and curesponsing charge
App.use( '/api/', BusinessRouter);///////http://localhost:3001/api/changeCharge/
App.use( '/api/', BusinessRouter); ///////http://localhost:3001/api/image-processing'// proces image for string information
App.use('/api',BusinessRouter);
App.use('/api/', DeliveryPartnerWindow);
App.listen(port, () => {
    console.log(`server running on port ${port}`);
});