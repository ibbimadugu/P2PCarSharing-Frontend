import React, { useState } from "react";
import API from "../api";
import { toast } from "react-hot-toast";

function AddCarModal({ closeModal }) {
  const [formData, setFormData] = useState({
    title: "",
    pricePerDay: "",
    location: "",
    owner: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await API.post("/api/cars", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Car added successfully!");
      closeModal();

      // Refresh the page after a short delay to allow UI updates
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to add car:", error);
      toast.error("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg w-[400px] sm:w-[500px]">
        <h2
          className="text-4xl text-center mb-6 text-blue-600"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          Add New Car
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <input
              type="text"
              name="title"
              placeholder="Car Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
            <input
              type="number"
              name="pricePerDay"
              placeholder="Price Per Day"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
            <input
              type="text"
              name="owner"
              placeholder="Owner Name"
              value={formData.owner}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="flex justify-between items-center space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 bg-gray-300 rounded-lg text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;
