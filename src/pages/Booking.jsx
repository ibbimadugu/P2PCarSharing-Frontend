import React, { useEffect, useState } from "react";
import API from "../api";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
        setLoading(false); // Set loading to false when the data is fetched
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
        setLoading(false); // Set loading to false in case of an error
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

  if (loading) {
    return <p>Loading...</p>; // Display a loading message
  }

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1
        className="pl-2 text-2xl mb-6"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}>
        My Bookings
      </h1>
      {error && <p className="text-red-600">{error}</p>}{" "}
      {/* Show error message if exists */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={`https://p2pcarsharing-backend.onrender.com${booking.car.image}`}
                alt={booking.car.model}
                className="w-full h-48 object-cover rounded"
              />
              <div className="p-5">
                <h2
                  className="text-2xl mt-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {booking.car.title}
                </h2>
                <p className="text-sm">Price: ₦{booking.totalPrice}</p>
                <p className="text-sm">Date: {booking.startDate}</p>
                <p className="text-sm">
                  Payment: {booking.paid ? "✅ Paid" : "Pending"}
                </p>
                {!booking.paid && (
                  <button
                    onClick={() => handlePayment(booking._id)}
                    disabled={booking.paid} // Disable button if already paid
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Pay Now
                  </button>
                )}
              </div>
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
