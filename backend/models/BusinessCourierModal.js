const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDescriptionSchema = new Schema({
    weight: { type: String, require: true },
    length: { type: String, require: true },
    width: { type: String, require: true },
    height: { type: String, require: true },
    content: { type: String, require: true },
    description: { type: String, require: true },
    estimated_price: { type: String, require: true }
});

const LocationDataSchema = new Schema({
    fromlat: { type: String, require: true },
    fromlon: { type: String, require: true },
    tolat: { type: String, require: true },
    tolon: { type: String, require: true },
    Distance: { type: String, require: true },
    Duration: { type: String, require: true }
});

const BillingDetails = new Schema({
    choosedPlane: { type: String, require: true },
    totalPrice: { type: String, require: true },
    nearestLocation: { type: String, require: true },
    pickupDate: { type: String, require: true },
    smsCharge: { type: String, require: true },
    pickupCharge: { type: String, require: true },
    extraSecurityCharge: { type: String, require: true },
    invoiceNumber: { type: String, require: true },
    invoiceDate: { type: String, require: true },
    trackingId: { type: String, require: true },
    status: { type: String, default: 'order created' },
    collectedBy:{ type:String, require: true },
    paymentStatus: { type: String, default: "payment success" }
});

const BusinessCourierSchema = new Schema({
    from_name: { type: String, require: true },
    from_phone_number: { type: String, require: true },
    from_state: { type: String, require: true },
    from_address: { type: String, require: true },
    from_zipcode: { type: String, require: true },
    from_district: { type: String, require: true },
    from_vat_id: { type: String, require: true },
    to_name: { type: String, require: true },
    to_phone_number: { type: String, require: true },
    to_address: { type: String, require: true },
    to_state: { type: String, require: true },
    to_zipcode: { type: String, require: true },
    to_district: { type: String, require: true },
    user_id: { type: String, require: true },
    to_vat_id: { type: String, require: true },
    productionDescription: { type: ProductDescriptionSchema, require: true },
    Location: { type: LocationDataSchema, require: true },
    Invoice: { type: BillingDetails, require: true },
   
}); 

const Business = mongoose.model('BusinessParcel', BusinessCourierSchema);
module.exports = Business;
