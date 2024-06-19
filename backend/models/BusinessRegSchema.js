const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessRegSchema = new Schema({
    login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', require: true },
    name: { type: String, require: true },
    phone_number: { type: String, require: true },
    address: { type: String, require: true },
    aadhar_number: { type: String, require: true },
    email_address: { type: String, require: true },
    password: { type: String, require: true },
    aadhar_image: { type: String, require: true },
    state: { type: String, require: true },
    district: { type: String, require: true },
    zipcode: { type: String, require: true },
    location: {
        type: { type: String, enum: ['Point'], require: true },
        coordinates: { type: [Number], require: true }
    },
    user_name: { type: String, require: true },
    Role: { type: String, default: "0" }
});

// Create the geospatial index on the location field
BusinessRegSchema.index({ location: '2dsphere' });

const BusinessRegistration = mongoose.model("BusinessRegistration", BusinessRegSchema);
module.exports = BusinessRegistration;
