import React, { useEffect, useState } from "react";
import API from "../api";
import CarCard from "../components/CarCard";

function CarListing() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/cars");
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Cars</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
}

export default CarListing;
