const { fetchProducts } = require("../db");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { createReview, createProduct, updateProduct, deleteProduct } = require('../db/products');

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

app.put("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price} = req.body;

  try {
    const updatedProduct = await updateProduct(productId, name, description, price); 
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

app.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await deleteProduct(productId);

    if (deletedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});



module.exports = app;



