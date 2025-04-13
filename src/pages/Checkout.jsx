import React, { useState, useEffect } from "react";
import API from "../api";
import PaymentForm from "../components/PaymentForm";

function Checkout({ match }) {
  const [booking, setBooking] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await API.get(`/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBookingDetails();
  }, [id]);

  return (
    <div className="p-10">
      {booking ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
          <p>Car: {booking.car.model}</p>
          <p>Price: ₦{booking.car.price}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          <PaymentForm bookingId={booking._id} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Checkout;
