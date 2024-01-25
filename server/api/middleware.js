const { findUserByToken } = require("../db/auth");

const isLoggedIn = async (req, res, next) => {
  try {
    //console.log("Authorization Header:", req.headers.authorization);
    const user = await findUserByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    const error = Error("must be admin");
    error.status = 401;
    next(error);
  }
};

module.exports = { isLoggedIn, isAdmin };
