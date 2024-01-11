const {
  authenticate,
  findUserByToken,
  createUser
} = require('../db/auth');

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async(req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch(error) {
    if (error.code === '23505') {
    if (error.detail.includes('key value violates unique constraint "users_email_key"')) { 
      return res.status(409).send({message: 'Holy duplicate email batman, use a different one'});
    }
    if (error.detail.includes('key value violates unique constraint "users_username_key"')) {
      return res.status(409).send({message: 'Holy duplicate username batman, use a different one'})
      }
    }
    next(error);
  }
});

app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } catch(ex){
    next(ex);
  }
});

module.exports = app;
