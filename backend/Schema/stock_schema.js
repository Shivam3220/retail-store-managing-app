const mongoose = require("mongoose");
const { Schema } = mongoose;

const stock_schema = new Schema({
    product_name: String,
    selling_price: { type: Number, required: true },
    m_r_p: Number,
    availableStock: Number,
})


module.exports= mongoose.model("stock",stock_schema);