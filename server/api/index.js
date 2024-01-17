const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use("/products", require("./products"));
app.use("/", require("./auth"));
app.use("/orders", require("./orders"));
app.use("/lineItems", require("./lineItems"));
app.use("/reviews", require("./reviews"));
app.use("/users", require("./users"));
app.use("/wishlist", require("./wishList")); // Add this line

// A bunch of stuff to get the error handling to work that I dont fully understand 
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

module.exports = app;
