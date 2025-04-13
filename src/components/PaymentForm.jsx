import React, { useState, useEffect } from "react";
import API from "../api";

function PaymentForm({ bookingId }) {
  const [amount, setAmount] = useState(0); // Initialize state for amount
  const [paymentStatus, setPaymentStatus] = useState(null); // State to track payment status

  // Fetch the payment amount from the API (you can customize this part based on your backend)
  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        if (res.data) {
          setAmount(res.data.totalPrice); // Update amount based on fetched data
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
      }
    };

    fetchAmount();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      await API.post("/payments", { bookingId });
      setPaymentStatus("success"); // Update payment status on success
      alert("Payment successful!");
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentStatus("failed"); // Update payment status on failure
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
      <div className="flex justify-between">
        <p>Amount: ₦{amount}</p>
        <button
          onClick={handlePayment}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Pay Now
        </button>
      </div>
      {paymentStatus && (
        <p
          className={`mt-2 text-sm ${
            paymentStatus === "success" ? "text-green-500" : "text-red-500"
          }`}>
          {paymentStatus === "success"
            ? "Payment was successful!"
            : "Payment failed. Please try again."}
        </p>
      )}
    </div>
  );
}

export default PaymentForm; // Ensure the component is exported
