const {sign, verify} = require("jsonwebtoken");
const config = require("../../config/index");

const secretKey = config.jwt_secret_key;
const secretKeyAdmin = config.jwt_secret_key_admin;
const expiresIn = config.jwt_expires_in;

const generateToken = (payload) => sign (payload, secretKey, {expiresIn});

const generateAdminToken = (payload) => sign (payload, secretKeyAdmin, {expiresIn});

const verifyToken = (token, callback) => verify (token, secretKey, callback);

const verifyAdminToken = (token, callback) => verify (token, secretKeyAdmin, callback);

module.exports = {
  generateToken,
  generateAdminToken,
  verifyToken,
  verifyAdminToken
};