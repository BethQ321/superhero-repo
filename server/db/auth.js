const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const findUserByToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, username,password, phone,email, is_admin, is_vip,Fname,Lname, image
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if (!response.rows.length) {
      const error = Error("bad credentials");
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

const authenticateGit = async(code) => {
  let response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT,
    code,
    client_secret: process.env.GITHUB_SECRET
  },{
    headers: {
      accept: 'application/json'
    }
  })
  response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${response.data.access_token}`
    }
  })
  const login = response.data.login
  let SQL = `
  SELECT id 
  FROM users 
  WHERE username = $1
  `
  response = await client.query(SQL, [login])
  if(!response.rows.length){
    SQL = `
    INSERT INTO users (id, username, is_Oauth)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    response = await client.query(SQL, [uuidv4(), login, true])
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);

};


const authenticateGoogle = async(code) => {
  let response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GOOGLE_CLIENT,
    code,
    client_secret: process.env.GOOGLE_SECRET
  },{
    headers: {
      accept: 'application/json'
    }
  })
  response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${response.data.access_token}`
    }
  })
  const login = response.data.login
  let SQL = `
  SELECT id 
  FROM users 
  WHERE username = $1
  `
  response = await client.query(SQL, [login])
  if(!response.rows.length){
    SQL = `
    INSERT INTO users (id, username, is_Oauth)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    response = await client.query(SQL, [uuidv4(), login, true])
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);

};

// Authorization: Bearer OAUTH-TOKEN
// GET https://api.github.com/user



const authenticate = async (credentials) => {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if (!response.rows.length) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(
    credentials.password,
    response.rows[0].password
  );
  if (!valid) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

const createUser = async (user) => {
  if (!user.username.trim() || !user.password.trim()) {
    throw Error("must have username and password");
  }
  try {
    user.password = await bcrypt.hash(user.password, 5);
    const SQL = `
    INSERT INTO users (id, username, password, Fname, Lname, email, phone, is_admin, is_vip) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
  `;
    const response = await client.query(SQL, [
      uuidv4(),
      user.username,
      user.password,
      user.Fname,
      user.Lname,
      user.email,
      user.phone,
      user.is_admin || false, 
      user.is_vip || false, 
    ]);

    return response.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      if (error.detail.includes("username")) {
        throw new Error(
          "Holy Duplicate Username, Batman! Use a different one."
        );
      } else if (error.detail.includes("email")) {
        throw new Error(
          "Holy already registered email, Batman! Use a different one."
        );
      }
    }
    throw error;
  }
};

const updateUserProfile = async (id, fname, lname, email, phone, image) => {
  try {
    const SQL = `
      UPDATE users
      SET Fname = $2, Lname = $3, email = $4, phone = $5, image = $6
      WHERE id = $1
    `;
    await client.query(SQL, [id, fname, lname, email, phone, image]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  updateUserProfile,
  authenticate,
  authenticateGit,
  findUserByToken,
};
