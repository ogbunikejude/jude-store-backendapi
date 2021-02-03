const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
     name: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     categories: String,
     price: {
          type: String,
          required: true
     },
     sale_price: {
          type: String,
          required: true
     },
     image: {
          type: String,
          required: true
     }
})
const Product = mongoose.model('products', productSchema)
module.exports = Product