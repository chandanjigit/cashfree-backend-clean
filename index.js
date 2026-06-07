app.post("/create-order", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
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

    console.log("Cashfree Response:", response.data);  // ✅ Debug log
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Payment failed" });
  }
});
