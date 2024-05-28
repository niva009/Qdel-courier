const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateCalculatorSchema = new Schema({
   fromlat: { type: String, required: true },
   fromlon: { type: String, required: true },
   tolat: { type: String, required: true },
   tolon: { type: String, required: true },
   weight: { type: Number, required: true },
   volumeWeight: { type: String, required: true },
});

const RateModel = mongoose.model('RateCalculator', RateCalculatorSchema);
module.exports = RateModel;
