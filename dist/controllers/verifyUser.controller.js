"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const verifyToken_1 = require("../utils/tokens/verifyToken");
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = (0, verifyToken_1.verifyToken)(token);
        const user = await users_model_1.default.findOne({ where: { email: decoded.email } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
        return;
    }
    catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};
exports.verifyEmail = verifyEmail;
