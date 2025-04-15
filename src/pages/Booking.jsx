import React from "react";
import useBookings from "../components/Booking/useBookings.jsx";
import BookingList from "../components/Booking/BookingList.jsx";

function Booking() {
  const { bookings, loading, error, cancelBooking } = useBookings();

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1 className="pl-2 text-2xl mb-6" style={{ fontFamily: "Bebas Neue" }}>
        My Bookings
      </h1>
      {error && <p className="text-red-600">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BookingList bookings={bookings} onCancel={cancelBooking} />
      )}
    </div>
  );
}

export default Booking;
