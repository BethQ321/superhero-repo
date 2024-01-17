const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
} = require("../db/cart");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchLineItems(req.user.id));
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log("POST to /lineItems, req.body:", req.body);
    res.send(await createLineItem(req.body));
  } catch (ex) {
    console.error("Error in POST /lineItems:", ex);
    next(ex);
  }
});


app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    //TODO make sure the order's user_id is req.user.id
    res.send(await updateLineItem({ ...req.body, id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    //TODO make sure the order's user_id is req.user.id
    await deleteLineItem({ id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
