const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { createReview, fetchReviews } = require("../db/products");

app.get("/", async (req, res, next) => {
    try {
      res.send(await fetchReviews());
    } catch (ex) {
      next(ex);
    }
  });


// route for creating reviews for a specific product
//third pass the new values into createReview
app.post("/", async (req, res, next) => {
  try {
    
    // const product_id = req.body.product_id;
    // const review_title = req.body.review_title;
    // const reviewText = req.body.reviewText;
    // const rating = req.body.rating;
    // const username = req.user

    // const createdReview = await createReview({
    //   product_id,
    //   review_title,
    //   reviewText,
    //   rating,
    //   username,
    // });

    
    const reviewData = req.body;
    const createdReview = await createReview(reviewData);

    res.status(201).json(createdReview);
  } catch (error) {
    next(error); 
  }
});


module.exports = app;