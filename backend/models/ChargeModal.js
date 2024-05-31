const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ChargeData = new Schema({

    pricePerKm:{type:String, require:true},
    PricePerKg:{ type:String,require:true},
    pricePerVolume:{ type:String,require:true},
    expressStandardMultiplier:{ type:String,require:true},
    expressPremiumMultiplier:{ type:String,require:true},
})

module.exports = mongoose.model('ChargeModal', ChargeData);