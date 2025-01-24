import { Request, Response } from "express";
import { sendMailWithAttachment } from "../utils/mails/mailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import Mailer from "../models/mailer.model";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../uploads/")); // Absolute path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export const sendMail = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const { name, to, subject, message } = req.body;
    const file = req.file;
    console.log(req.body)

    // Validate input
    if (!to || !Array.isArray(to) || to.length === 0) {
      res.status(400).json({ message: "Recipient emails are required and should be an array." });
      return;
    }
    if (!subject || !message) {
      res.status(400).json({ message: "Subject and message are required." });
      return;
    }

    const filePath = file ? path.resolve(file.path) : null;

    if (filePath && !fs.existsSync(filePath)) {
      res.status(400).json({ message: "Uploaded file not found." });
      return;
    }

    const mailInfo = await Mailer.findOne({ where: { userId: id } });
    const email = mailInfo?.mailUser;
    const pass = mailInfo?.mailPass;

    res.status(200).json({ message: "Email sent successfully." });
    await sendMailWithAttachment(name, email, pass, to, subject, message, filePath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email." });
    return;
  }
};
