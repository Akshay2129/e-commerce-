const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';
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
        // jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        //     if (err) return res.status(500).send('Token Error');
        //     resp.status(200).send({ result, auth: token });
        // });
        resp.status(200).send({ result });
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
                // jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                //     if (err) return res.status(500).send('Token Error');
                //     resp.status(200).send({ user, auth: token });
                // });
                resp.status(200).send({ user });

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

app.get('/product/:id', async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.status(404).send({ message: "Product not found" });
    }
})

// update product api

app.put('/product/:id', async (req, resp) => {
    let result = await Product.updateOne({ _id: req.params.id }, {
        $set: req.body
    });
    if (result) {
        resp.send({ message: "Product updated successfully", result });

    } else {
        resp.status(404).send({ message: "Product not found" });
    }
})

// search api

app.get('/search/:key', async (req, res) => {
    try {
        const key = req.params.key;
        const regex = new RegExp(key, 'i');
        const result = await Product.find({
            "$or": [
                { name: { $regex: regex } },
                { company: { $regex: regex } },
                { category: { $regex: regex } },
                { price: { $regex: regex } }
            ]
        });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while searching for products', error });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
