"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegister_controller_1 = require("../controllers/userRegister.controller");
const userLogin_controller_1 = require("../controllers/userLogin.controller");
const verifyUser_controller_1 = require("../controllers/verifyUser.controller");
const email_controller_1 = require("../controllers/email.controller");
const resendVerification_controller_1 = require("../controllers/resendVerification.controller");
const userAuth_1 = require("../middleware/userAuth");
const addMailConfig_1 = require("../controllers/addMailConfig");
const adminAuth_1 = require("../middleware/adminAuth");
const createAdmin_1 = require("../controllers/createAdmin");
const getMailConfig_controller_1 = require("../controllers/getMailConfig.controller");
const pay_controller_1 = require("../controllers/pay.controller");
const verifyPayment_controller_1 = require("../controllers/verifyPayment.controller");
const router = (0, express_1.Router)();
router.post("/register", userRegister_controller_1.register);
router.post("/login", userLogin_controller_1.login);
router.get("/verify/:token", verifyUser_controller_1.verifyEmail);
router.post('/resend-verification', resendVerification_controller_1.resendVerification);
router.post("/send-mail", userAuth_1.userAuth, email_controller_1.upload.single("attachment"), email_controller_1.sendMail);
router.post("/new-admin", createAdmin_1.createAdmin);
router.post("/add-mail-config/:id", adminAuth_1.adminAuth, addMailConfig_1.addMailConfig);
router.get("/mail-config", userAuth_1.userAuth, getMailConfig_controller_1.getMailConfig);
router.post("/pay", userAuth_1.userAuth, pay_controller_1.pay);
router.get("/verify-payment/:trxref", userAuth_1.userAuth, verifyPayment_controller_1.verifyPayment);
exports.default = router;
