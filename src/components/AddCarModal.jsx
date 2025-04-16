import React, { useState } from "react";
import API from "../api";

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
      const res = await API.post("/api/cars", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Car added:", res.data);
      closeModal();
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Car Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price Per Day"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner Name"
            value={formData.owner}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;
