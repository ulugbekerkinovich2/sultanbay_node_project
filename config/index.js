require("dotenv/config");

const config = {
  port: process.env.PORT || 3000,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_secret_key_admin: process.env.JWT_SECRET_KEY_ADMIN,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d',
  // mongoUri: process.env.mongoUri
};




require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); // Encode the password
const dbUrl = process.env.DB_URL;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const mongoUri = `mongodb://${dbUser}:${dbPassword}@${dbUrl}:${dbPort}/${dbName}?authSource=admin`;

module.exports = {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_secret_key_admin: process.env.JWT_SECRET_KEY_ADMIN,
    jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d',
    mongoUri,
    port: process.env.PORT || 3000
};
module.exports = config;
