"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../utils/mails/mailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resendVerification = async (req, res) => {
    const { email } = req.body;
    try {
        const token = jsonwebtoken_1.default.sign({ email }, `${process.env.APP_SECRET}`);
        await (0, mailer_1.sendVerificationEmail)(email, token);
        res
            .status(200)
            .json({ message: "Verification mail sentt" });
        return;
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
};
exports.resendVerification = resendVerification;
