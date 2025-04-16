import axios from "axios";
import BookingCard from "./BookingCard";
import { toast } from "react-hot-toast";

// Create an axios instance with dynamic base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const BookingList = ({ bookings, setBookings }) => {
  const handleCancel = async (bookingId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmed) return;

      await API.delete(`/api/bookings/${bookingId}`);

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
};

export default BookingList;
