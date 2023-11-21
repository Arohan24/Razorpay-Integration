import { instance } from "../server.js";
import crypto from "crypto";

export const checkout = async (req, res) => {
  const amount = Number(req.body.amount); // Amount in paise (50000 = 500 INR)
  console.log(amount);
  const currency = "INR";

  const options = {
    amount,
    currency,
  };

  try {
    const order = await instance.orders.create(options); // Create the Razorpay order
    console.log(order);
    res.json({ order }); // Send the order as a JSON response
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:4000/paymentVerification?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};