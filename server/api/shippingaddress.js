const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const {
  fetchShippingAddress,
  createShippingAddress,
} = require("../db/products");
app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchShippingAddress());
  } catch (ex) {
    next(ex);
  }
});


app.post("/", async (req, res, next) => {
  user_id = req.body.user_id;
  try {
    const shippingData = req.body;
    const createdShippingAddress = await createShippingAddress(
      shippingData,
      user_id
    );

    res.status(201).json(createdShippingAddress);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
