"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users_model_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Email not yet registered" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Incorrect password" });
            return;
        }
        if (!user.isVerified) {
            res.status(403).json({ message: "Email not verified" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, `${process.env.APP_SECRET}`, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
