const { fetchProducts } = require("../db");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { fetchReviews, createReview } = require('../db/products');

app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
    //res.send(await fetchReviews());
  } catch (ex) {
    next(ex);
  }
});

/*app.put("/products/:id", isLoggedIn, isAdmin, (req, res, next) => {
  res.send("hello world");
});*/

app.post('/products/:id', isLoggedIn, async (req, res, next) => {
  try {
    console.log("Received POST request to /products/:id");
    const productId = req.params.id;
    console.log("Product ID:", productId);

    // Corrected: Pass an object with the required properties to createReview
    const review = await createReview({
      product_id: productId,
      review: req.body.review,
      rating: req.body.rating,
      
    });

    res.send(review);
  } catch (error) {
    next(error);
  }
});


module.exports = app;



