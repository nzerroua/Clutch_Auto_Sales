import { Link } from "react-router-dom";
import { BadgeDollarSign, Gauge } from "lucide-react";

export default function CarCard({ car }) {
  const firstImage = car.imageUrls?.[0] || "/fallback.jpg";

  return (
    <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <Link to={`/cars/${car.id}`}>
        <div className="overflow-hidden h-44 sm:h-48">
          <img
            src={`https://clutch-auto-sales.onrender.com${firstImage}`}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between h-52">
        <div>
          <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
            {car.year} {car.make} {car.model}
          </h3>
          {car.trim && (
            <p className="text-sm text-gray-500 mt-0.5">{car.trim}</p>
          )}
        </div>

        {/* Price & Mileage */}
        <div className="mt-3 flex items-center justify-between text-gray-800 font-medium">
          <div className="flex items-center gap-1">
            <BadgeDollarSign className="w-4 h-4 text-green-600" />
            <span className="text-md text-green-600">
              ${car.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{car.mileage.toLocaleString()} mi</span>
          </div>
        </div>

        {/* CTA */}
        <Link to={`/cars/${car.id}`}>
          <button
            className="mt-4 w-full py-2 rounded-md text-white font-semibold text-sm bg-gray-900 hover:bg-gray-800 transition-all"
            aria-label="Explore Vehicle"
          >
            Explore Vehicle
          </button>
        </Link>
      </div>
    </div>
  );
}
