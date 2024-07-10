const bcrypt = require("bcrypt");
const Joi = require("joi");
const {generateAdminToken} = require("../utils/jwt");
const User = require("../models/User.model");

const adminRegister = async (req, res) => {
    try {
        const {fullname, username, password} = req.body;

        const check = Joi.object ({
            fullname: Joi.string().min(6).required(),
            username: Joi.string().min(6).required(),
            password: Joi.string().min(6).required(),
        });
        const {error} = check.validate ({fullname, username, password});
        if (error) return res.status(400).json({ message: error.message });

        const findUser = await User.findOne({username});
        if(findUser) return res.status(403).json({ message: "User already registered" });

        const hashedPass = await bcrypt.hash(password, 12);

        const newAdmin = await User.create({ fullname: fullname, username: username, password: hashedPass, isAdmin: true });
        
        const token = generateAdminToken({ id: newAdmin.id });
        
        await newAdmin.save();
        res.status(201).json({ message: "Success", data: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

const adminLogin = async (req, res) => {
    try {
        const {username, password} = req.body;

        const adminUser = await User.findOne({username, isAdmin: true});
        if(!adminUser) return res.status(404).json({ message: "Admin not found" });

        const verify = await bcrypt.compare(password, adminUser.password);
        
        if (!verify) return res.status(403).json({ message: "Invalid password" });

        const token = generateAdminToken({id: adminUser.id});
        
        res.status(201).json({ message: "Success", data: token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    };
};

module.exports = {adminRegister, adminLogin};