const express = require("express");
const axios = require("axios");
const cors = require("cors");   // ✅ नया जोड़ा गया

const app = express();

app.use(express.json());
app.use(cors());   // ✅ अब browser से calls allow होंगे

// Create Cashfree Order
app.post("/create-order", async (req, res) => {
  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: "order_" + Date.now(),
        order_amount: 15,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust001",
          customer_email: "test@example.com",
          customer_phone: "9999999999"
        }
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Payment failed" });
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
