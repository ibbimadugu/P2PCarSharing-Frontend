import React, { useEffect, useState } from "react";
import API from "../api";

function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handlePayment = async (bookingId) => {
    try {
      await API.post("/payments", { bookingId });
      alert("Payment successful!");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="border p-4 shadow-md rounded-lg">
              <img
                src={booking.car.imageUrl}
                alt={booking.car.model}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">
                {booking.car.model}
              </h2>
              <p className="text-sm">Price: ₦{booking.car.price}</p>
              <p className="text-sm">
                Date: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Payment: {booking.paid ? "✅ Paid" : "❌ Pending"}
              </p>
              {!booking.paid && (
                <button
                  onClick={() => handlePayment(booking._id)}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Pay Now
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Booking;
