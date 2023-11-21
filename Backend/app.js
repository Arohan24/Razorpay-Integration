import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";

export const app = express();

config({ path: "./config/config.env" });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", paymentRoute);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({key:process.env.RAYZORPAY_API_KEY})
);