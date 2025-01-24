"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// const appSecret = "crossBorder";
dotenv_1.default.config();
const appSecret = `${process.env.APP_SECRET}`;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, appSecret);
};
exports.verifyToken = verifyToken;
