const mongoose = require("mongoose");
const { Schema } = mongoose;

const bill_record_schema = new Schema({
    buyerName: String,
    billNo: { type: Number, required: true },
    billDetail: Array,
    date: { type: Date, default: Date.now },
    totalAmount: Number
})


module.exports= mongoose.model("bill_record",bill_record_schema);