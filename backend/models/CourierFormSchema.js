const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring assignment to extract Schema from mongoose

const CourierFormSchema = new Schema({
        invoiceNumber: { type: String, require: true },
        formData: {
            from_name: { type: String, require: true },
            from_phone_number: { type: String, require: true }, 
            from_address: { type: String, require: true },
            from_state: { type: String, require: true },
            from_zipcode: { type: String, require: true },
            from_city: { type: String, require: true },
            from_district: { type: String, require: true },
            to_name: { type: String, require: true },
            to_phone_number: { type: String, require: true },
            to_address: { type: String, require: true },
            to_state: { type: String, require: true },
            to_zipcode: { type: String, require: true },
            to_city: { type: String, require: true },
            to_district: { type: String, require: true },
            user_id: { type:String, require: true},
        },
        boxInfo: {
            noOfPackages: { type: String, require: true },
            totalWeight: { type: String, require: true },
            length: { type: String, require: true },
            breadth: { type: String, require: true },
            height: { type: String, require: true },
            description: { type: String, require: true },
        },
        pickupdate: { type: Date, require: true },
        deliveryDate: { type: Date, require: true },
        invoiceDate: { type: Date, require: true },
        trackingId: { type: String, require: true },
        fromlat: { type: String, require: true },
        fromlon: { type: String, require: true },
        tolat: { type: String, require: true },
        tolon: { type: String, require: true },
        Distance: { type: String, require: true },
        Duration: { type: String, require: true },
        status: { type:String, default: 'pending'},
        status_id: { type:String, require: true},
            });

const CourierModel = mongoose.model('courier_form', CourierFormSchema);
module.exports = CourierModel;
