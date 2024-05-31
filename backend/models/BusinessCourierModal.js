const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ProductDescriptionSchema = new Schema({
    weight: { type: String, required: true },
    length: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    estimated_price: { type: String, required: true },
});

const LocationDataSchema = new Schema({
    fromlat:{ type:String, require:true},
    fromlon:{ type:String, require:true},
    tolat:{ type: String, require:true},
    tolon:{ type: String, require:true},
    Distance:{ type:String,require:true},
    Duration:{type:String,require:true},
})

const BillingDetails = new Schema({
    choosedPlane:{ type:String, require:true},
    totalPrice:{ type:String, require:true},
    nearestLocation:{ type:String, require:true},
    pickupDate:{ type:String, require:true},
    smsCharge:{ type:String, require:true},
    pickupCharge:{ type:String, require:true},
    extraSecurityCharge:{ type:String, require:true},
    invoiceNumber:{ type:String, require:true},
    invoiceDate:{ type:String,require:true},
    trackingNumber:{type:String, require: true}
})


const BusinessCourier = new Schema ( {
    from_name: { type: String, require: true },
    from_phone_number: { type: String, require: true },
    from_state: { type: String, require: true },
    from_address:{ type:String,require: true},
    from_zipcode: { type: String, require: true },
    from_city: { type: String, require: true },
    from_district: { type: String, require: true }, 
    from_vat_id: { type:String, require: true},   
    from_eoriNumber: { type:String, require: true},  
    to_name: { type: String, require: true },
    to_phone_number: { type: String, require: true },
    to_address: { type: String, require: true },
    to_state: { type: String, require: true },
    to_zipcode: { type: String, require: true },
    to_city: { type: String, require: true },
    to_district: { type: String, require: true },
    user_id: { type:String, require: true},   
    to_vat_id: { type:String, require: true},   
    to_eoriNumber: { type:String, require: true}, 
    productionDescription: { type: ProductDescriptionSchema, require:true},
    Location:{ type:LocationDataSchema, require:true},
    Invoice:{ type:BillingDetails, require:true},

})
module.exports = mongoose.model('BusinessParcel', BusinessCourier);