const { authenticate, findUserByToken, createUser, updateUserProfile, } = require("../db/auth");

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


 app.put("/:id", async (req, res, next) => {

  const id = req.params.id;
  const { fname, lname, email, phone, image } = req.body;


  try {
    await updateUserProfile(id, fname, lname, email, phone, image);
        res.status(200).send('Profile updated successfully');
    
  } catch (error) {
    console.error('Error updating profile in api/auth:', error);
    next(error);
  }
});

app.put("/:id", async (req, res, next) => {
  //console.log("api/auth 2 " , req.body)
   const {id} =req.params;
   
  try {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const image = req.body.image;
    //const userId = req.user.id;

    await updateUserProfile(id, fname, lname, email, phone, image);

    console.log("api/id works")
  } catch (error) {
    console.error('Error updating profile in api/auth/ID:', error);
    next(error)
  }
});




module.exports = app;
