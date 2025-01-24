import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// const appSecret = "crossBorder";
dotenv.config();
const appSecret: any = `${process.env.APP_SECRET}`;

export const verifyToken = (token: string) => {
    return jwt.verify(token, appSecret);
  };