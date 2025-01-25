import { Request, Response } from "express";
import Users from "../models/users.model";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { role } from "../models/users.model";
import dotenv from "dotenv";

dotenv.config();

export const createAdmin = async (req: Request, res: Response) => {
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
      role: role.ADMIN,
      isVerified: true,
    });

    res
      .status(201)
      .json({ message: "Admin created" });
    return;
  } catch (err:any) {
    console.log(err.message)
    res.status(500).json({ message: "Server error" });
    return;
  }
};
