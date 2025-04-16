import React, { useState } from "react";
import API from "../api";
import { toast } from "react-hot-toast"; // ✅ Import toast

function BookingForm({ car, closeModal }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("End date must be after the start date.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      await API.post(
        "/api/bookings",
        {
          carId: car._id,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking successful!");
      closeModal();

      // Refresh page after brief delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(
        "Booking failed with error:",
        err.response ? err.response.data : err.message
      );
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col">
        <label htmlFor="startDate" className="mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          className="p-2 border rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="endDate" className="mb-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          className="p-2 border rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition duration-300">
        Book Now
      </button>
    </form>
  );
}

export default BookingForm;
