const { fetchOrders, updateOrder, deleteOrder, fetchAllOrders } = require("../db/cart");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {

    res.send(await updateOrder({ ...req.body, id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchOrders(req.user.id));
  } catch (ex) {
    next(ex);
  }
});

app.get("/all", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.send(await fetchAllOrders());
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const orderId = req.params.id;
    console.log("Deleting order with ID:", orderId);
    await deleteOrder(orderId);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});




module.exports = app;
