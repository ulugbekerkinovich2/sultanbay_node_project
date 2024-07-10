require("dotenv/config");

const config = {
  port: process.env.PORT || 3000,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_secret_key_admin: process.env.JWT_SECRET_KEY_ADMIN,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d',
  mongoUri: process.env.mongoUri
};

module.exports = config;