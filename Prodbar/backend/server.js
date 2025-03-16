import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept json data in the req.body. This is what we call a middle air (function that runs before you send a response back to the client)

app.post("/api/products", async (req, res) => {
    const product = req.body // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }
    // res.send("Server is ready");
    const newProduct = new product(product)
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }   catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Postman will be used to test the app

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000 ");
});

