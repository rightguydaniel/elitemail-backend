import { Router } from "express";
import { register } from "../controllers/userRegister.controller";
import { login } from "../controllers/userLogin.controller";
import { verifyEmail } from "../controllers/verifyUser.controller";
import { sendMail, upload } from "../controllers/email.controller";
import { resendVerification } from "../controllers/resendVerification.controller";
import { userAuth } from "../middleware/userAuth";
import { addMailConfig } from "../controllers/addMailConfig";
import { adminAuth } from "../middleware/adminAuth";
import { createAdmin } from "../controllers/createAdmin";
import { getMailConfig } from "../controllers/getMailConfig.controller";
import { pay } from "../controllers/pay.controller";
import { verifyPayment } from "../controllers/verifyPayment.controller";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.post('/resend-verification', resendVerification)
router.post("/send-mail", userAuth, upload.single("attachment"), sendMail);
router.post("/new-admin", createAdmin)
router.post("/add-mail-config/:id", adminAuth, addMailConfig)
router.get("/mail-config", userAuth, getMailConfig)
router.post("/pay", userAuth, pay)
router.get("/verify-payment/:trxref", userAuth, verifyPayment)

export default router;
