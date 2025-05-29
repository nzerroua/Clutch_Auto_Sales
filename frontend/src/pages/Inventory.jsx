import React, { useState } from "react";
import InventoryFilter from "../components/InventoryFilter";
import InventoryGrid from "../components/InventoryGrid";
import { FaCar, FaEnvelope } from "react-icons/fa";

export default function Inventory() {
  const [filters, setFilters] = useState({
    search: "",
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    style: "",
    sort: "price-asc",
  });

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-black text-white py-28 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/pages-hero-bg.jpg')", // Make sure this image exists
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Browse Our Inventory
          </h1>
        </div>
      </section>

      {/* Filter Section */}
      <section
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12"
        id="filter-section"
      >
        <InventoryFilter filters={filters} setFilters={setFilters} />
      </section>

      {/* Inventory Results */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <InventoryGrid filters={filters} />
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have a Question or Want to Trade In Your Car?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Our team is here to assist with anything you need — whether it’s a
            vehicle inquiry, financing help, or evaluating your current car.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              <FaEnvelope /> Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
