import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Mailer from "../models/mailer.model";
import { v4 } from "uuid";
import Users from "../models/users.model";

export const addMailConfig = async (req: JwtPayload, res: Response) => {
  const { id } = req.params;
  const { mailUser, mailPass, email } = req.body;
  try {
    if (id.length > 5) {
      const addById = await Mailer.create({
        id: v4(),
        userId: id,
        mailUser,
        mailPass,
        mailPort: 465,
        mailServer: "elitemail.live",
      });
      res.status(201).json({ message: "Email config added" });
      return;
    }
    if (email) {
      const user = await Users.findOne({ where: { email } });
      const addByEmail = await Mailer.create({
        id: v4(),
        userId: user?.id,
        mailUser,
        mailPass,
        mailPort: 465,
        mailServer: "elitemail.live",
      });
      res.status(201).json({ message: "Email config added" });
      return;
    }
    res.status(400).json({ message: "Operation Failed" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
