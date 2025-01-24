import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// const appSecret = "crossBorder";
dotenv.config();
const appSecret: any = process.env.APP_SECRET;

export const generateToken = (data: Object) => {
  return jwt.sign(data, appSecret, { expiresIn: "10m" });
};
