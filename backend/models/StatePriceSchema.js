    const mongoose = require('mongoose');
    const Schema = mongoose.Schema


    const StatePriceSchema = new Schema ({

        name:{ type:String,require:true},
        basePricePerKm:{ type:Number, require:true},
        expressStandardMultiplier:{ type:Number, require:true},
        expressPremiumMultiplier:{ type:Number, require:true},
        weightFactor:{ type:String, require:true},
        volumeFactor:{ type:String, require:true},
    })

    module.exports = mongoose.model('states', StatePriceSchema);