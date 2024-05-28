const mongoose = require('mongoose');
const Schema = mongoose.Schema


const AddressBook = new Schema ( {
    to_name: { type: String, require: true },
    to_phone_number: { type: String, require: true },
    nickname:{ type:String, require: true},
    to_address: { type: String, require: true },
    to_state: { type: String, require: true },
    to_zipcode: { type: String, require: true },
    to_city: { type: String, require: true },
    to_district: { type: String, require: true },
    user_id: { type:String, require: true},   
    to_vat_id: { type:String, require: true},   
    to_eoriNumber: { type:String, require: true},   
})
module.exports = mongoose.model('AddressBook', AddressBook);