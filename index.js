const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://mahekdhup.blogspot.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.post("/create-order", async (req, res) => {
  try {

    const orderData = {
      order_id: "order_" + Date.now(),
      order_amount: 15,
      order_currency: "INR",
      customer_details: {
        customer_id: "cust_" + Date.now(),
        customer_email: "test@example.com",
        customer_phone: "9999999999"
      }
    };

    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      orderData,
      {
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01"
        }
      }
    );

    console.log("Cashfree Success:", response.data);

    res.json({
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id
    });

  } catch (error) {

    console.error(
      "Cashfree Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Cashfree Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
