import React, { useRef } from "react";
import usePayPalButtons from "./usePayPalButtons";

const BookingCard = ({ booking, onCancel }) => {
  const buttonRef = useRef(null);

  // Use the usePayPalButtons hook to render PayPal button
  usePayPalButtons(booking, buttonRef);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src={`https://p2pcarsharing-backend.onrender.com${booking.car.image}`}
        alt={booking.car.model}
        className="w-full h-48 object-cover rounded"
      />
      <div className="p-5">
        <h2 className="text-2xl mt-2" style={{ fontFamily: "Bebas Neue" }}>
          {booking.car.title}
        </h2>
        <p className="text-sm">Price: ₦{booking.totalPrice}</p>
        <p className="text-sm">
          Date: {new Date(booking.startDate).toLocaleDateString("en-GB")}
        </p>
        <p className="text-sm">
          Payment: {booking.paid ? "✅ Paid" : "❌ Pending"}
        </p>

        <div className="mt-3 items-center">
          {!booking.paid && (
            <div ref={buttonRef} id={`paypal-btn-${booking._id}`} />
          )}
          <button
            onClick={() => onCancel(booking._id)}
            className="w-full py-2 font-bold bg-red-500 hover:bg-red-600 text-white text-sm rounded mt-2 block text-center">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
