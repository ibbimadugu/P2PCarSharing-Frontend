import React from "react";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings, onCancel }) => {
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingList;
