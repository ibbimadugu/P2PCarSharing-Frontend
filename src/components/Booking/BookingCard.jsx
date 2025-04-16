import React, { useRef } from "react";
import usePayPalButtons from "./usePayPalButtons";

const BookingCard = ({ booking, onCancel }) => {
  const buttonRef = useRef(null);

  const getImageUrl = () => {
    if (!booking?.car || !booking.car.image) return "/assets/default-car.jpg";

    const API_BASE_URL =
      import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

    const imagePath = booking.car.image.startsWith("/")
      ? booking.car.image
      : `/${booking.car.image}`;

    return `${API_BASE_URL}${imagePath}`;
  };

  const fallbackImage =
    booking?.car?.image && typeof booking.car.image === "string"
      ? `http://localhost:5000/${booking.car.image.replace(/^\/+/, "")}`
      : "/assets/default-car.jpg";

  // Render PayPal buttons
  usePayPalButtons(booking, buttonRef);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src={getImageUrl()}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
        alt={booking?.car?.model || "Car"}
        className="w-full h-48 object-cover rounded"
      />
      <div className="p-5">
        <h2 className="text-2xl mt-2" style={{ fontFamily: "Bebas Neue" }}>
          {booking?.car?.title || "Car Title"}
        </h2>

        <p className="text-sm">Price: ${booking.totalPrice.toFixed(2)}</p>
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
