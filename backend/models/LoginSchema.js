const mongoose = require("mongoose");
const Schema = mongoose.Schema;

LoginSchema = new Schema({
    user_name: { type: String, require: true},
    password: { type: String, require: true},
    role: { type: String, require: true},
    district:{ type:String,require:true},
})
const Login = mongoose.model('LoginSection',LoginSchema);
module.exports = Login;