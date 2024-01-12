const { fetchProducts } = require("../db");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { fetchReviews } = require('../db/products');

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
    res.send(await fetchReviews());
  } catch (ex) {
    next(ex);
  }
});

app.put("/products/:id", isLoggedIn, isAdmin, (req, res, next) => {
  res.send("hello world");
});

app.post('/products/:id', async(req,res,next ) => { 
  try{
    res.send(await createReview(req.body))
  
  }
  catch(error){
  next(error)
  }}
  )


module.exports = app;



