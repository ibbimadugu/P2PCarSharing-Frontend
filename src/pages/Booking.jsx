import React, { useEffect, useState, useRef } from "react";
import API from "../api";
import { loadPayPalScript } from "../utils/loadPayPal";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const buttonContainers = useRef({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle PayPal rendering
  useEffect(() => {
    const renderButtons = async () => {
      await loadPayPalScript();

      bookings.forEach((booking) => {
        if (!booking.paid && buttonContainers.current[booking._id]) {
          // Prevent multiple renderings
          buttonContainers.current[booking._id].innerHTML = "";

          window.paypal
            .Buttons({
              createOrder: async () => {
                const res = await API.post("/api/payments/create-order", {
                  bookingId: booking._id,
                });
                return res.data.orderID;
              },
              onApprove: async (data) => {
                await API.post("/api/payments/capture-order", {
                  orderID: data.orderID,
                  bookingId: booking._id,
                });
                alert("Payment successful!");
                // Refresh bookings
                const updated = await API.get("api/bookings");
                setBookings(updated.data);
              },
            })
            .render(`#paypal-btn-${booking._id}`);
        }
      });
    };

    if (!loading && bookings.length > 0) {
      renderButtons();
    }
  }, [bookings, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1 className="pl-2 text-2xl mb-6" style={{ fontFamily: "Bebas Neue" }}>
        My Bookings
      </h1>
      {error && <p className="text-red-600">{error}</p>}

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
                  style={{ fontFamily: "Bebas Neue" }}>
                  {booking.car.title}
                </h2>
                <p className="text-sm">Price: ₦{booking.totalPrice}</p>
                <p className="text-sm">
                  Date: {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Payment: {booking.paid ? "✅ Paid" : "Pending"}
                </p>

                {/* PayPal Button Placeholder */}
                {!booking.paid && (
                  <div
                    id={`paypal-btn-${booking._id}`}
                    ref={(el) => (buttonContainers.current[booking._id] = el)}
                    className="mt-3"
                  />
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
