const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema from mongoose

const DeliveryRegisterSchema = new Schema({ // Use Schema instead of mongoose.Schema
    login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    license_number: { type: String, required: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    license_image: { type: String, required: true },
    aadhar_image: { type: String, required: true },
    state:{ type: String, required:true},
    district:{ type:String, required: true},
    user_image: { type: String, required: true },
    code:{ type:String, require:true},
    Role: { type: String }, // Default role is '3' for delivery partners
});

module.exports = mongoose.model('DeliveryPartners', DeliveryRegisterSchema);
//0 - default
//1- admin
//2- users
//3 - Delivery partner
//4 -Business partner