const express = require("express");
const app = express.Router();
const { isLoggedIn, isAdmin } = require("./middleware");
const { fetchUsers, toggleVIPStatus } = require("../db/users");


app.get("/", async (req,res,next) => {
    try {
     res.send(await fetchUsers())
    } catch (error) {
     next(error)
    }
});

app.put("/:userId/toggleVIP", async (req, res, next) => {
    const { userId } = req.params;
    const { isVip } = req.body;
  try {
      const updatedUser = await toggleVIPStatus(userId, isVip);
        res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  });
  

module.exports = app;
