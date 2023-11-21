import express from "express";
import { checkout,paymentVerification } from "../controllers/paymentController.js";
const router=express.Router();

router.route("/checkout").post(checkout); // Use .post() to handle HTTP POST requests
router.route("/paymentVerification").post(paymentVerification);
export default router;