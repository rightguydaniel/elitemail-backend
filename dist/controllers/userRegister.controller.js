"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_2 = require("../models/users.model");
const mailer_1 = require("../utils/mails/mailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res) => {
    console.log("ready to go");
    try {
        const { userName, mailName, email, password } = req.body;
        const existingUser = await users_model_1.default.findOne({ where: { email } });
        if (existingUser) {
            console.log("Email already exists");
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await users_model_1.default.create({
            id: (0, uuid_1.v4)(),
            userName,
            mailName,
            email,
            password: hashedPassword,
            role: users_model_2.role.USER,
            isVerified: false,
        });
        const token = jsonwebtoken_1.default.sign({ email }, `${process.env.APP_SECRET}`);
        await (0, mailer_1.sendVerificationEmail)(email, token);
        res
            .status(201)
            .json({ message: "User registered. Please verify your email." });
        return;
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
        return;
    }
};
exports.register = register;