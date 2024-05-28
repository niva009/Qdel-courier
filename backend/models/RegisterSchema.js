const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true },
    zipcode: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
    user_name: { type: String, required: true },
    role: { type: String },
});

module.exports = mongoose.model('Users', RegisterSchema);
