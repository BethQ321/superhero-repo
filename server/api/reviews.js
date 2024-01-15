const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { createReview } = require("../db/products");


// route for creating reviews for a specific product
app.post("/", async (req, res, next) => {
  try {
    const reviewData = req.body;
    const createdReview = await createReview(reviewData);

    res.status(201).json(createdReview);
  } catch (error) {
    next(error); 
  }
});


module.exports = app;