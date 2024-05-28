const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BusinessReg = new Schema({
    login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
    name:{ type:String , require: true},
    phone_number:{ type: String , require: true},
    address: { type: String , require: true},
    aadhar_number:{ type: String, require:true},
    email_address:{ type: String, require:true},
    password:{ type: String, require: true},
    aadhar_image: {type: String, require: true},
    state: {type: String, require: true},
    district: {type: String, require: true},
    user_name:{ type: String, require: true},
    Role:{ type: String, default:"0"},
})

module.exports= mongoose.model( "BusinessRegistration", BusinessReg)