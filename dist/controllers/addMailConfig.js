"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMailConfig = void 0;
const mailer_model_1 = __importDefault(require("../models/mailer.model"));
const uuid_1 = require("uuid");
const users_model_1 = __importDefault(require("../models/users.model"));
const addMailConfig = async (req, res) => {
    const { id } = req.params;
    const { mailUser, mailPass, email } = req.body;
    try {
        if (id.length > 5) {
            const addById = await mailer_model_1.default.create({
                id: (0, uuid_1.v4)(),
                userId: id,
                mailUser,
                mailPass,
                mailPort: 465,
                mailServer: "elitemail.live",
            });
            res.status(201).json({ message: "Email config added" });
            return;
        }
        if (email) {
            const user = await users_model_1.default.findOne({ where: { email } });
            const addByEmail = await mailer_model_1.default.create({
                id: (0, uuid_1.v4)(),
                userId: user?.id,
                mailUser,
                mailPass,
                mailPort: 465,
                mailServer: "elitemail.live",
            });
            res.status(201).json({ message: "Email config added" });
            return;
        }
        res.status(400).json({ message: "Operation Failed" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
};
exports.addMailConfig = addMailConfig;
