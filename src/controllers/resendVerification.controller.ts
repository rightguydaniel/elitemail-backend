import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/mails/mailer";
import dotenv from "dotenv";

dotenv.config();

export const resendVerification = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const token = jwt.sign({ email }, `${process.env.APP_SECRET}`);
    await sendVerificationEmail(email, token);

    res
      .status(200)
      .json({ message: "Verification mail sentt" });
    return;
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
