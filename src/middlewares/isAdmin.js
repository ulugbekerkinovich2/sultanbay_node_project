const {verifyAdminToken} = require("../utils/jwt");
const User = require("../models/User.model");

const isAdmin = (req, res, next) => {
    if(!req.headers.token)
        return res.status(401).json({ message: "Permission denied" });

        verifyAdminToken (req.headers.token, async (err, data) => {
            if(err) return res.status(401).json({ message: "Token is wrong" });

            req.user = data;
            const id = req.user.id;
            const users = await User.find();
            const findAdmin = users.find((user) => user.isAdmin && user.id == id);
            if (!findAdmin) return res.status(401).json({ message: "User is not Admin" });
            next();
        });
};

module.exports = isAdmin;