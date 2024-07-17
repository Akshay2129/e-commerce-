const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();

app.use(express.json());
app.use(cors());

// Register endpoint
app.post('/register', async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        resp.status(200).send(result);
    } catch (error) {
        console.error('Error saving data:', error);
        resp.status(400).send('Internal Server Error');
    }
});

// Login endpoint
app.post('/login', async (req, resp) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            let user = await User.findOne({ email, password }).select("-password");
            if (user) {
                resp.status(200).send(user);
            } else {
                resp.status(400).send('No User found In Database');
            }
        } else {
            resp.status(400).send('Email and Password are required');
        }
    } catch (error) {
        console.error('Error during login:', error);
        resp.status(500).send('Internal Server Error');
    }
});


//add product information

app.post('/addProduct', async (req, resp) => {

    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

});

// product list api

app.get('/products', async (req, resp) => {
    try {
        let products = await Product.find({});
        resp.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        resp.status(500).send('Internal Server Error');
    }
})

//delete product api

app.delete('/product/:id', async (req, resp) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            resp.send({ message: "Product deleted successfully", result });
        } else {
            resp.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        resp.status(500).send({ message: "Internal Server Error" });
    }
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
