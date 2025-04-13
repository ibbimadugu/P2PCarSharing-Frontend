import React, { useState } from "react";
import API from "../api";

function BookingForm({ car, closeModal }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both start and end dates are selected
    if (!startDate || !endDate) {
      setMessage("Please select both start and end dates.");
      return;
    }

    // Ensure the start date is before the end date
    if (new Date(startDate) >= new Date(endDate)) {
      setMessage("End date must be after the start date.");
      return;
    }

    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      // Make the API request with the required headers
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

      setMessage("Booking successful!");
      closeModal(); // Close the modal after successful booking
    } catch (err) {
      // Log the full error to inspect the response
      console.error(
        "Booking failed with error:",
        err.response ? err.response.data : err.message
      );
      setMessage("Booking failed. Please try again.");
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
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Book Now
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </form>
  );
}

export default BookingForm;
