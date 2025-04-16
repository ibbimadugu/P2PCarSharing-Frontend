import BookingCard from "./BookingCard";
import { toast } from "react-hot-toast";

const BookingList = ({ bookings, onCancel }) => {
  const handlePaymentSuccess = () => {
    toast.success("Payment successful"); // Optionally, trigger a reload or refetch in parent
  };

  const handleCancel = async (bookingId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmed) return;

      const booking = bookings.find((b) => b._id === bookingId);
      if (booking?.paid) {
        toast.error("You cannot cancel a paid booking.");
        return;
      }

      await onCancel(bookingId); // Use prop function to trigger cancellation in parent
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-600">No bookings found.</p>;
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onCancel={handleCancel}
          onPaymentSuccess={handlePaymentSuccess}
        />
      ))}
    </div>
  );
};

export default BookingList;
