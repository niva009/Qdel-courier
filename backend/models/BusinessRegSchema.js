const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessReg = new Schema({
    login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    aadhar_number: { type: String, required: true },
    email_address: { type: String, required: true },
    password: { type: String, required: true },
    aadhar_image: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    zipcode: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    user_name: { type: String, required: true },
    Role: { type: String, default: "0" }
});

BusinessReg.index({ location: '2dsphere' });

module.exports = mongoose.model("BusinessRegistration", BusinessReg)