import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000';
const PaymentSuccess = () => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a POST request to your server to verify the payment
    axios.post('/api/paymentVerification', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })
    .then(response => {
      if (response.data.success) {
        setMessage('Order Successful');
      } else {
        setMessage('Payment verification failed. Please contact support.');
      }
    })
    .catch(error => {
      setMessage('An error occurred. Please contact support.');
    });
  }, [razorpay_order_id, razorpay_payment_id, razorpay_signature]);

  return (
    <div>
      <h1>{message}</h1>
      <p>Razorpay Order ID: {razorpay_order_id}</p>
      <p>Razorpay Payment ID: {razorpay_payment_id}</p>
      <p>Razorpay Signature: {razorpay_signature}</p>
    </div>
  );
};

export default PaymentSuccess;
