import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Users from "../models/users.model";
import axios from "axios";

export const pay = async (req: JwtPayload, res: Response) => {
  const { amount } = req.body;
  console.log(req.body)
  const id = req.user.id;
  try {
    const user = await Users.findOne({ where: { id } });
    const email = user?.email;
    if (!email) {
      res.status(400).json({ message: "User email not found." });
      return
    }

    const params = JSON.stringify({
      email,
      amount: amount * 100,
      currency:"NGN",
      callback_url:`${process.env.APP_URL}/verify-payment`,
      channels:["card", "bank", "ussd", "bank_transfer"],
    });
    const endpoint = "https://api.paystack.co/transaction/initialize";
    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    };
    const payment = await axios.post(endpoint, params, { headers });
    console.log(payment.data)
    res.status(200).json({ message: "success", data: payment.data });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Error making payment." });
    return;
  }
};
