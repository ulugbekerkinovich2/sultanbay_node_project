const bcrypt = require("bcrypt");
const Joi = require("joi");
const {generateToken} = require("../utils/jwt");
const User = require("../models/User.model");

const registerController = async (req, res) => {
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

        const newUser = await User.create({ fullname: fullname, username: username, password: hashedPass});
        
        const token = generateToken({ id: newUser.id });
        
        await newUser.save();
        res.status(201).json({ message: "Success", data: token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    };
};

const loginController = async (req, res) => {
    try {
        const {username, password} = req.body;

        const check = Joi.object ({
            username: Joi.string().min(6).required(),
            password: Joi.string().min(6).required(),
        });
        const {error} = check.validate ({username, password});
        if (error) return res.status(400).json({ message: error.message });

        const findUser = await User.findOne({username});
        if(!findUser) return res.status(403).json({ message: "Incorrect username or password" });

        const verify = await bcrypt.compare(password, findUser.password);
        
        if (!verify) return res.status(403).json({ message: "Invalid password" });

        const token = generateToken({id: findUser.id});
        
        res.status(201).json({ message: "Success", data: token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    };
};

module.exports = {registerController, loginController};