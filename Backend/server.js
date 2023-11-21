import { app } from "./app.js";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAYZORPAY_API_KEY,
  key_secret: process.env.RAYZORPAY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`The Server is now running on Port:${process.env.PORT}`);
});
