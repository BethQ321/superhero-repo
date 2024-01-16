const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { fetchUsers } = require("../db/users");


app.get("/", async (req,res,next) => {
    try {
     res.send(await fetchUsers())
    } catch (error) {
     next(error)
    }
});

module.exports = app;
