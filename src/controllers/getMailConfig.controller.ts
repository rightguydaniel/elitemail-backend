import { JwtPayload } from "jsonwebtoken";
import Mailer from "../models/mailer.model";
import { Response } from "express";

export const getMailConfig = async (req: JwtPayload, res: Response) => {
  const id = req.user.id;
  try {
    if (id) {
      const mailConfig = await Mailer.findOne({ where: { userId: id } });
      res.status(200).json({
        data: {
          user: mailConfig?.mailUser,
          pass: mailConfig?.mailPass,
          server: mailConfig?.mailServer,
          port: mailConfig?.mailPort,
        },
      });
      return;
    }
    res.status(500).json({ message: "You are not logged in" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
