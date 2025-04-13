import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/api/cars");
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleBook = async (carId) => {
    try {
      await API.post("/api/bookings", { carId });
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Failed to book car");
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1
        className="text-2xl mb-8  text-gray-800 pl-2"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}>
        Available Cars for Rent
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={`https://p2pcarsharing-backend.onrender.com${car.image}`}
                alt={car.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {car.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Price: ₦{car.pricePerDay}/day
                </p>
                <p className="text-gray-600">Location: {car.location}</p>
                <p className="text-gray-600">Owner: {car.owner}</p>
                <button
                  onClick={() => handleBook(car._id)}
                  className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600 col-span-full">
            No cars available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
