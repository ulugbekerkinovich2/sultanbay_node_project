const {verifyToken}= require("../utils/jwt");

const isAuth = (req, res, next) => {
  if (!req.headers.token)
  return res.status(401).json({ message: "Permission denied" });

verifyToken (req.headers.token, (err, data) => {
  if (err) return res.status(401).json({ message: "Permission denied" });
  
  req.user = data;
  next();
});
};

module.exports = isAuth;