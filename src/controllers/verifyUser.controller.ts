import { Request, Response } from "express";
import Users from "../models/users.model";
import { verifyToken } from "../utils/tokens/verifyToken";

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const decoded: any = verifyToken(token)
    const user = await Users.findOne({ where: { email: decoded.email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
    return;
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
