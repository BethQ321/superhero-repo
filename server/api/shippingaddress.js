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




// route for creating reviews for a specific product
app.post("/", async (req, res, next) => {
    try {
    const shippingData = req.body;
    const createdShippingAddress = await createShippingAddress(shippingData);

    res.status(201).json(createdShippingAddress);
    } catch (error) {
    next(error); 
    }
});


module.exports = app;