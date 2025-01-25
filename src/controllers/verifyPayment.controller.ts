import axios from "axios";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Users, { sub } from "../models/users.model";

export const verifyPayment = async (req: JwtPayload, res: Response) => {
  const id = req.user.id;
  const { trxref } = req.params;
  const endpoint = `https://api.paystack.co/transaction/verify/${trxref}`;
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
    // "Content-Type": "application/json",
  };
  try {
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    const payment = await axios.get(endpoint, { headers });
    if (payment.data.status === true) {
      if (payment.data.data.amount === 20000 * 100) {
        const subStartDate = payment.data.data.paid_at;
        const subEndDate = new Date(subStartDate);
        subEndDate.setMonth(subEndDate.getMonth() + 1);
        user.subStartDate = subStartDate;
        user.subEndDate = subEndDate;
        user.subType = sub.MONTHLY;
      } else {
        user.subStartDate = payment.data.paid_at;
        user.subType = sub.PAYG;
        user.units = payment.data.data.amount / 1000;
        user.subEndDate = null;
      }
      await user.save();
      res.status(200).json({ message: "Payment verified successfully.", user });
      return;
    }
    res.status(400).json({ message: "Payment verification Failed." });
    return;
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: "payment verification failed" });
  }
};
