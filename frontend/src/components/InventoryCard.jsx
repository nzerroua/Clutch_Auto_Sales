import React from "react";
import { Link } from "react-router-dom";
import {
  FaGasPump,
  FaTachometerAlt,
  FaCar,
  FaCogs,
  FaPalette,
  FaCalendarAlt,
} from "react-icons/fa";

export default function InventoryCard({ car }) {
  const imageUrl = car.imageUrls?.[0] || "/fallback.jpg"; // fallback image

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <Link to={`/cars/${car.id}`} className="block relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
        />
        {car.status && (
          <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-full shadow">
            {car.status}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-1">
          <Link to={`/cars/${car.id}`}>
            <h2 className="text-lg font-bold text-gray-900 hover:text-gray-700 transition">
              {car.year} {car.make} {car.model}
            </h2>
          </Link>
          <p className="text-base font-bold text-red-600">
            ${car.price.toLocaleString()}
          </p>
        </div>

        {/* Sub Info */}
        <p className="text-sm text-gray-500 mb-3">{car.style}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
          <div className="flex items-center">
            <FaTachometerAlt className="text-gray-400 mr-2" />
            {car.mileage.toLocaleString()} mi
          </div>
          <div className="flex items-center">
            <FaGasPump className="text-gray-400 mr-2" />
            {car.fuelType || "N/A"}
          </div>
          <div className="flex items-center">
            <FaCogs className="text-gray-400 mr-2" />
            {car.transmission || "N/A"}
          </div>
          <div className="flex items-center">
            <FaCar className="text-gray-400 mr-2" />
            {car.drivetrain || "N/A"}
          </div>
          {car.exteriorColor && (
            <div className="flex items-center col-span-1">
              <FaPalette className="text-gray-400 mr-2" />
              {car.exteriorColor}
            </div>
          )}
          {car.engine && (
            <div className="flex items-center col-span-1">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              {car.engine}
            </div>
          )}
        </div>

        {/* Features Preview */}
        {car.features?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Key Features
            </h4>
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  +{car.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/cars/${car.id}`}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded-lg font-semibold text-sm transition duration-300"
          >
            View Details
          </Link>
          <Link
            to="/contact"
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 text-center py-2 px-4 rounded-lg font-semibold text-sm transition duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
