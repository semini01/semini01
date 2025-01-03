const mongoose = require('mongoose');   // Import mongoose

const ProductSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please enter product name"],   
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);  // Create a model

module.exports = Product;  // Export model