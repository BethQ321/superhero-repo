const { fetchProducts } = require("../db");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { createReview, createProduct } = require('../db/products');

app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
      const newProduct = await createProduct(req.body); 
      res.status(201).json(newProduct); 
  } catch (error) {
      next(error); 
  }
});


module.exports = app;



