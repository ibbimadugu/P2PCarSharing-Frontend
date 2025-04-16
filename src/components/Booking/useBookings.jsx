import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-hot-toast";

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      // Change PUT to DELETE here
      await API.delete(`/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBookings(); // Refresh the list of bookings after canceling
      toast.success("Booking cancelled successfully");
    } catch (err) {
      console.error("Cancel booking error:", err);
      toast.error("Failed to cancel booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, cancelBooking };
};

export default useBookings;
