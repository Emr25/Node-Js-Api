const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
        
      },
      creator: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      }
})

const Product = mongoose.model("product",productSchema)
module.exports=Product