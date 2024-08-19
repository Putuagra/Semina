const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpired: process.env.JWT_EXPIRED,
  jwtSecret: process.env.JWT_SECRET,
  mail: process.env.EMAIL,
  password: process.env.PASSWORD,
};
