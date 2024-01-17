const { authenticate, findUserByToken, createUser } = require("../db/auth");

const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");

app.post("/login", async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json({ message: error.message });
    }
    next(error);
  }
});

app.get("/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

/*app.get("/", async (req,res,next) => {
     try {
      res.send(await fetchUsers())
     } catch (error) {
      next(error)
     }
});*/

module.exports = app;
