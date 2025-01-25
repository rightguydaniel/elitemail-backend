"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.upload = void 0;
const mailer_1 = require("../utils/mails/mailer");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mailer_model_1 = __importDefault(require("../models/mailer.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_model_1 = __importDefault(require("../models/users.model"));
dotenv_1.default.config();
// Multer configuration for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.resolve(__dirname, "../../uploads/")); // Absolute path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
exports.upload = (0, multer_1.default)({ storage });
const sendMail = async (req, res) => {
    try {
        const id = req.user?.id;
        const { name, to, subject, message } = req.body;
        const file = req.file;
        //check if user has units or is subscribed
        const user = await users_model_1.default.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if ((!user.units || user.units <= 0) &&
            (!user.subEndDate || new Date(user.subEndDate) < new Date())) {
            res
                .status(400)
                .json({ message: "You have no active subscriptions or message units" });
            return;
        }
        if (to.length > user?.units && user?.subEndDate === null) {
            res
                .status(400)
                .json({ message: `You can only send to ${user?.units} mails` });
            return;
        }
        // Validate input
        if (!to || !Array.isArray(to) || to.length === 0) {
            res
                .status(400)
                .json({
                message: "Recipient emails are required and should be an array.",
            });
            return;
        }
        if (!subject || !message) {
            res.status(400).json({ message: "Subject and message are required." });
            return;
        }
        const filePath = file ? path_1.default.resolve(file.path) : null;
        if (filePath && !fs_1.default.existsSync(filePath)) {
            res.status(400).json({ message: "Uploaded file not found." });
            return;
        }
        const mailInfo = await mailer_model_1.default.findOne({ where: { userId: id } });
        const email = mailInfo?.mailUser;
        const pass = mailInfo?.mailPass;
        res.status(200).json({ message: "Email sent successfully." });
        await (0, mailer_1.sendMailWithAttachment)(name, email, pass, to, subject, message, filePath);
        if (filePath) {
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                }
                else {
                    console.log("Uploaded file deleted successfully.");
                }
            });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Failed to send email." });
        return;
    }
};
exports.sendMail = sendMail;
