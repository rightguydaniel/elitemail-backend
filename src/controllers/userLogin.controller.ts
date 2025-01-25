import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users.model";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Email not yet registered" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    if (!user.isVerified) {
      res.status(403).json({ message: "Email not verified" });
      return;
    }

    const token = jwt.sign({ id: user.id }, `${process.env.APP_SECRET}`, {
      expiresIn: "1h",
    });
    const sessionExpiry = new Date(new Date());
    sessionExpiry.setHours(sessionExpiry.getHours() + 1);
    res
      .status(200)
      .json({ token, sessionExpiry, subStartDate: user?.subStartDate });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
