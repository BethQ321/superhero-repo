const {  updateUserProfile } = require("../db/auth");
const express = require("express");
const app = express.Router();


app.put("/:id", async (req, res, next) => {

    const id = req.params.id;
    const { fname, lname, email, phone, image } = req.body;
  
  
    try {
        console.log(id)
      await updateUserProfile(id, fname, lname, email, phone, image);
          res.status(200).send('Profile updated successfully');
      
    } catch (error) {
      console.error('Error updating profile in api/update:', error);
      next(error);
    }
  });

  module.exports = app;