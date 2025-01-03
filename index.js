const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

//middleware to json and nodejs
app.use(express.json());
//in insomnia add product from url encoded to json instead to json directly
app.use(express.urlencoded({ extended: false }));



//print in browser
app.get('/', (req, res) => {
    res.send("Hello from Node API Updated!")
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//to get product by id after implementing above endnpoint
app.get('/api/product/:id', async (req, res) => { //before edit or update api me line eke products, product  kla mkda eka product ekk nsa
    try {
        const { id } = req.params; //get id from url
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    //pahala line deke ek process ekkt connect wela tibune
    // console.log(req.body);
    //res.send(req.body);
    // res.send("Product received/created successfully!"); meka deela brows klama cannot get awe therefor uda line deka dmma.
});

//update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);// if exist then update

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//detete a product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect("mongodb+srv://wickramasinghesemini:E1s8bvJvV1rekjEb@backenddb.c6uva.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Hello there! Server is running on port 3000");
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });