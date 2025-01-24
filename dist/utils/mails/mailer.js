"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailWithAttachment = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    const url = `${process.env.APP_URL}/verify/${token}`;
    await transporter.sendMail({
        from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
    });
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendMailWithAttachment = async (name, email, pass, to, subject, message, attachmentPath) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
            user: email,
            pass: pass,
        },
    });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (const recipient of to) {
        const mailOptions = {
            from: `${name} <${process.env.MAIL_FROM_ADDRESS}>`,
            to: recipient, // Send email individually
            subject,
            text: message,
            attachments: attachmentPath
                ? [
                    {
                        path: attachmentPath,
                    },
                ]
                : [],
        };
        try {
            await transporter.sendMail(mailOptions); // Send the email
            console.log(`Email sent to: ${recipient}`);
        }
        catch (error) {
            console.error(`Failed to send email to ${recipient}:`, error);
        }
        // Introduce a delay of 1 minute (60,000 milliseconds)
        await delay(60000);
    }
};
exports.sendMailWithAttachment = sendMailWithAttachment;
