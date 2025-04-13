import React, { useState } from "react";
import API from "../api";

function BookingForm({ car }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setMessage("Please select both start and end dates.");
      return;
    }

    try {
      await API.post("/bookings", {
        carId: car._id,
        startDate,
        endDate,
      });
      setMessage("Booking successful!");
    } catch (err) {
      console.error(err);
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
