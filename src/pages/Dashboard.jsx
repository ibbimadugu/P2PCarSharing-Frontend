import React, { useEffect, useState } from "react";
import API from "../api";
import BookingForm from "../components/BookingForm";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        // Make API call with Authorization header
        const res = await API.get("/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Handle booking button click, set selected car and show modal
  const handleBook = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null); // Reset selected car when modal is closed
  };

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1
        className="text-2xl mb-8 text-gray-800 pl-2"
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
                <h2
                  className="text-2xl  text-gray-800"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {car.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Price: ₦{car.pricePerDay}/day
                </p>
                <p className="text-gray-600">Location: {car.location}</p>
                <p className="text-gray-600">Owner: {car.owner}</p>
                <button
                  onClick={() => handleBook(car)}
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

      {/* Modal overlay for booking form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              Book {selectedCar.title}
            </h2>
            <BookingForm car={selectedCar} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
