import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaCar, FaFilter, FaSortAmountDown } from "react-icons/fa";

export default function InventoryFilter({ filters, setFilters }) {
  const [options, setOptions] = useState({
    makes: [],
    models: [],
    styles: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(
          "https://clutch-auto-sales.onrender.com/api/cars/filters",
          {
            params: { make: filters.make || "" },
          }
        );
        setOptions(res.data);
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    };

    fetchOptions();
  }, [filters.make]);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const priceOptions = [
    0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 75000,
    100000, 150000,
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      {/* Main Search Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by model or keyword"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition duration-300"
        >
          <FaFilter />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Make */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCar className="text-gray-400" />
              </div>
              <select
                value={filters.make}
                onChange={(e) => {
                  updateFilter("make", e.target.value);
                  updateFilter("model", "");
                }}
                className="pl-10 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Makes</option>
                {options.makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <select
              value={filters.model}
              onChange={(e) => updateFilter("model", e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={!filters.make}
            >
              <option value="">All Models</option>
              {options.models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <select
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">No Min</option>
              {priceOptions.map((price) => (
                <option key={`min-${price}`} value={price}>
                  ${price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <select
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">No Max</option>
              {priceOptions
                .filter(
                  (price) =>
                    !filters.minPrice || price >= parseInt(filters.minPrice)
                )
                .map((price) => (
                  <option key={`max-${price}`} value={price}>
                    ${price.toLocaleString()}
                  </option>
                ))}
            </select>
          </div>

          {/* Style */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>
            <select
              value={filters.style}
              onChange={(e) => updateFilter("style", e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Types</option>
              {options.styles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Sort By
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSortAmountDown className="text-gray-400" />
              </div>
              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="pl-10 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="year-asc">Year: Oldest First</option>
                <option value="mileage-asc">Mileage: Low to High</option>
                <option value="mileage-desc">Mileage: High to Low</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  make: "",
                  model: "",
                  minPrice: "",
                  maxPrice: "",
                  style: "",
                  sort: "price-asc",
                })
              }
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
