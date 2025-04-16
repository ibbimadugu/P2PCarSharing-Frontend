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
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/api/bookings/${bookingId}/remove-car`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchBookings();
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
