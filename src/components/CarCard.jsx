import React from "react";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="border p-4 shadow-md rounded-lg">
      <img
        src={car.imageUrl}
        alt={car.model}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{car.model}</h2>
      <p className="text-sm">Price per day: ₦{car.pricePerDay}</p>
      <Link
        to={`/car/${car._id}`}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        View Details
      </Link>
    </div>
  );
}

export default CarCard;
