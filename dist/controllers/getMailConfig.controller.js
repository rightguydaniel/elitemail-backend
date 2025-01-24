"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailConfig = void 0;
const mailer_model_1 = __importDefault(require("../models/mailer.model"));
const getMailConfig = async (req, res) => {
    const id = req.user.id;
    try {
        if (id) {
            const mailConfig = await mailer_model_1.default.findOne({ where: { userId: id } });
            res.status(200).json({
                data: {
                    user: mailConfig?.mailUser,
                    pass: mailConfig?.mailPass,
                    server: mailConfig?.mailServer,
                    port: mailConfig?.mailPort,
                },
            });
            return;
        }
        res.status(500).json({ message: "You are not logged in" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
        return;
    }
};
exports.getMailConfig = getMailConfig;
