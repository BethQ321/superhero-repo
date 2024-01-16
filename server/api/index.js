const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");

app.use("/products", require("./products"));
app.use("/", require("./auth"));
app.use("/orders", require("./orders"));
app.use("/lineItems", require("./lineItems"));
app.use("/reviews", require("./reviews")); 
app.use("/users", require("./users"))

// Error handling middleware
app.use((err, req, res, next) => {
  // If the error object has a status, use it, otherwise default to 500
  const status = err.status || 500;

  // If the error object has a message, use it, otherwise use a generic message
  const message = err.message || "Internal Server Error";

  // Send the error as a JSON response
  res.status(status).json({ message });
});

module.exports = app;
