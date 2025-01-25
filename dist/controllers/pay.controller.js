"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pay = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const axios_1 = __importDefault(require("axios"));
const pay = async (req, res) => {
    const { amount } = req.body;
    console.log(req.body);
    const id = req.user.id;
    try {
        const user = await users_model_1.default.findOne({ where: { id } });
        const email = user?.email;
        if (!email) {
            res.status(400).json({ message: "User email not found." });
            return;
        }
        const params = JSON.stringify({
            email,
            amount: amount * 100,
            currency: "NGN",
            callback_url: `${process.env.APP_URL}/verify-payment`,
            channels: ["card", "bank", "ussd", "bank_transfer"],
        });
        const endpoint = "https://api.paystack.co/transaction/initialize";
        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
            "Content-Type": "application/json",
        };
        const payment = await axios_1.default.post(endpoint, params, { headers });
        console.log(payment.data);
        res.status(200).json({ message: "success", data: payment.data });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error making payment." });
        return;
    }
};
exports.pay = pay;
