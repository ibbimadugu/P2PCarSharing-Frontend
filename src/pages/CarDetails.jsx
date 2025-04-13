import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function CarDetails() {
  const [car, setCar] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await API.get(`/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car details:", err);
      }
    };

    fetchCarDetails();
  }, [id]);

  return (
    <div className="p-10">
      {car ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={car.imageUrl}
            alt={car.model}
            className="w-full h-80 object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold">{car.model}</h1>
            <p className="text-xl mt-2">₦{car.pricePerDay} per day</p>
            <p className="mt-4">{car.description}</p>
            <BookingForm car={car} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CarDetails;
