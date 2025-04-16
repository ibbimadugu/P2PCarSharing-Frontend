import React, { useEffect, useState } from "react";
import API from "../api";
import BookingForm from "../components/BookingForm";
import AddCarModal from "../components/AddCarModal";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = async () => {
    try {
      const res = await API.get("/api/cars");
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleBook = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-2xl text-gray-800"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          Available Cars for Rent
        </h1>
        <button
          onClick={() => setShowAddCarModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
          Add Car
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {cars.length > 0 ? (
          cars.map((car) => {
            const API_BASE_URL = import.meta.env.VITE_API_URL.replace(
              /\/+$/,
              ""
            );
            const imagePath = car.image.startsWith("/")
              ? car.image
              : `/${car.image}`;
            const primaryImage = `${API_BASE_URL}${imagePath}`;
            const fallbackImage = `http://localhost:5000${imagePath}`;

            return (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={primaryImage}
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = fallbackImage;
                  }}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2
                    className="text-2xl text-gray-800"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                    {car.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Price: ${car.pricePerDay}/day
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
            );
          })
        ) : (
          <p className="text-center text-lg text-gray-600 col-span-full">
            No cars available at the moment.
          </p>
        )}
      </div>

      {/* Booking Modal */}
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

      {/* Add Car Modal */}
      {showAddCarModal && (
        <AddCarModal
          closeModal={() => setShowAddCarModal(false)}
          onCarAdded={fetchCars}
        />
      )}
    </div>
  );
}

export default Dashboard;
