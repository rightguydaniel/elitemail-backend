import { Request, Response } from "express";
import { sendMailWithAttachment } from "../utils/mails/mailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import Mailer from "../models/mailer.model";
import dotenv from "dotenv";
import Users from "../models/users.model";

dotenv.config();

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

    //check if user has units or is subscribed
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // if (
    //   (!user.units || user.units <= 0) &&
    //   (!user.subEndDate || new Date(user.subEndDate) < new Date())
    // ) {
    //   res
    //     .status(400)
    //     .json({ message: "You have no active subscriptions or message units" });
    //   return;
    // }

    // if (to.length > user?.units && user?.subEndDate === null) {
    //   res
    //     .status(400)
    //     .json({ message: `You can only send to ${user?.units} mails` });
    //   return;
    // }

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

    const filePath = file ? path.resolve(file.path) : null;

    if (filePath && !fs.existsSync(filePath)) {
      res.status(400).json({ message: "Uploaded file not found." });
      return;
    }

    const mailInfo = await Mailer.findOne({ where: { userId: id } });
    const email = mailInfo?.mailUser || process.env.MAIL_USERNAME
    const pass = mailInfo?.mailPass || process.env.MAIL_PASSWORD
    if(!email || !pass){
      res.status(400).json({ message: "No mailbox found"});
      return
    }

    console.log(email, pass)

    res.status(200).json({ message: "Email sent successfully." });
    await sendMailWithAttachment(
      name,
      email,
      pass,
      to,
      subject,
      message,
      filePath
    );
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("Uploaded file deleted successfully.");
        }
      });
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to send email." });
    return;
  }
};
