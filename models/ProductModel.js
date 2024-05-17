const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    quantity: Number,
    price: Number,
    category: {
      type: String,
      enum: ['A', 'B', 'C'],
    },
  },
  {
    timestamps: true 
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
