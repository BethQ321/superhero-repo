const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { fetchShippingAddress, createShippingAddress } = require("../db/products");

app.get("/", async (req, res, next) => {
    try {
        res.send(await fetchShippingAddress());
    } catch (ex) {
        next(ex);
    }
    });




// route for creating a shipping address for a order,... connected to "../db/products"

app.post("/", async (req, res, next) => {
    
    // const id = req.params;
    try {
    const shippingData = req.body;
    const createdShippingAddress = await createShippingAddress(shippingData);

    res.status(201).json(createdShippingAddress);
    } catch (error) {
    next(error); 
    }
});


module.exports = app;