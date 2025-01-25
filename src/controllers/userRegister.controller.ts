import { Request, Response } from "express";
import Users from "../models/users.model";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { role } from "../models/users.model";
import { sendVerificationEmail } from "../utils/mails/mailer";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  console.log("ready to go")
  try {
    const { userName, mailName, email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      console.log("Email already exists")
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      id: v4(),
      userName,
      mailName,
      email,
      password: hashedPassword,
      role: role.USER,
      isVerified: false,
    });

    const token = jwt.sign({ email }, `${process.env.APP_SECRET}`);
    await sendVerificationEmail(email, token);

    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
    return;
  } catch (err:any) {
    console.log(err.message)
    res.status(500).json({ message: "Server error" });
    return;
  }
};
