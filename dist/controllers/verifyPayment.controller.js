"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const users_model_1 = __importStar(require("../models/users.model"));
const verifyPayment = async (req, res) => {
    const id = req.user.id;
    const { trxref } = req.params;
    const endpoint = `https://api.paystack.co/transaction/verify/${trxref}`;
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        // "Content-Type": "application/json",
    };
    try {
        const user = await users_model_1.default.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const payment = await axios_1.default.get(endpoint, { headers });
        if (payment.data.status === true) {
            if (payment.data.data.amount === 20000 * 100) {
                const subStartDate = payment.data.data.paid_at;
                const subEndDate = new Date(subStartDate);
                subEndDate.setMonth(subEndDate.getMonth() + 1);
                user.subStartDate = subStartDate;
                user.subEndDate = subEndDate;
                user.subType = users_model_1.sub.MONTHLY;
            }
            else {
                user.subStartDate = payment.data.paid_at;
                user.subType = users_model_1.sub.PAYG;
                user.units = payment.data.data.amount / 1000;
                user.subEndDate = null;
            }
            await user.save();
            res.status(200).json({ message: "Payment verified successfully.", user });
            return;
        }
        res.status(400).json({ message: "Payment verification Failed." });
        return;
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "payment verification failed" });
    }
};
exports.verifyPayment = verifyPayment;
