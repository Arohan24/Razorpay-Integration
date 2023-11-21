import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

export default function PayCard({ name, description, price, imgSrc }) {
  const [order, setOrder] = useState(null);

  const createOrder = async () => {
    try {
      
      const response = await axios.post("/api/checkout",{amount:price*100});
      setOrder({...response.data.order}); // Set the order directly, assuming the response includes the required fields
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  console.log(order);
  const handlePayment = async() => {
    const keyResponse = await axios.get("/api/getkey");
    console.log(keyResponse);
    const key = keyResponse.data.key;
    if (order) {
      const options = {
        key:key,
        amount: order.amount,
        currency: "INR",
        name: "Arohan Harsh Dubey",
        description: "RazorPay Integration",
        image:"/src/assets/profile photo croped.jpeg",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
      console.log(options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };
  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={imgSrc}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {price} INR
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {order ? (
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            onClick={handlePayment}
          >
            Buy
          </Button>
        ) : (
          <Button size="medium" variant="outlined" color="primary" onClick={createOrder}>
            Create Order
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
