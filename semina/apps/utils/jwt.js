const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpired } = require("../config");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpired,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = { createJWT, isTokenValid };
