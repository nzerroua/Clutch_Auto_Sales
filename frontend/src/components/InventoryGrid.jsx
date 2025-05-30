import React, { useState, useEffect } from "react";
import InventoryCard from "./InventoryCard";
import axios from "axios";
import { FaCarSide, FaSadTear, FaArrowDown } from "react-icons/fa";

export default function InventoryGrid({ filters }) {
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LIMIT = 12;

  useEffect(() => {
    setCars([]);
    setPage(1);
    setTotal(0);
    setHasMore(true);
    setLoading(true);

    const fetchInitial = async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        params.append("page", 1);
        params.append("limit", LIMIT);

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/cars?${params.toString()}`
        );

        setCars(res.data.cars);
        setTotal(res.data.total);
        setHasMore(res.data.cars.length === LIMIT);
      } catch (err) {
        setError("Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, [filters]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append("page", nextPage);
      params.append("limit", LIMIT);

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/cars?${params.toString()}`
      );

      const newCars = res.data.cars;
      const newUniqueCars = newCars.filter(
        (newCar) => !cars.some((existing) => existing.id === newCar.id)
      );

      setCars((prev) => [...prev, ...newUniqueCars]);
      setPage(nextPage);
      setHasMore(newCars.length === LIMIT);
    } catch (err) {
      setError("Failed to load more cars.");
    }
  };

  if (loading && cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FaSadTear className="text-4xl text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Oops!</h3>
        <p className="text-gray-600 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {total} Vehicle{total !== 1 && "s"} Found
        </h2>
        <div className="text-sm text-gray-500">
          Showing {cars.length} of {total}
        </div>
      </div>

      {cars.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map((car) => (
              <InventoryCard key={car.id} car={car} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl font-semibold text-lg transition-all duration-300"
              >
                <FaArrowDown className="animate-bounce-slow" />
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FaCarSide className="text-4xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No vehicles match your search
          </h3>
          <p className="text-gray-600 max-w-md">
            Try adjusting your filters or search criteria to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
