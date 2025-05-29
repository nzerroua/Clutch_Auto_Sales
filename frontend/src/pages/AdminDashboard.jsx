// File: src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2, PlusCircle, Mail, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars?limit=1000");
      setCars(res.data.cars || []);
    } catch {
      setError("Failed to load cars.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const token = localStorage.getItem("admin_token");

      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.error(
        "❌ Failed to delete car:",
        err.response?.data || err.message
      );
      alert("Failed to delete car.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Admin Nav Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Link
          to="/admin/add-car"
          className="flex flex-col items-center bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl shadow-lg text-center transition"
        >
          <PlusCircle size={32} className="mb-2" />
          <span className="font-semibold text-lg">Add New Car</span>
        </Link>
        <Link
          to="/admin/contact-forms"
          className="flex flex-col items-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl shadow-lg text-center transition"
        >
          <Mail size={32} className="mb-2" />
          <span className="font-semibold text-lg">Contact Messages</span>
        </Link>
        <Link
          to="/admin/financing-requests"
          className="flex flex-col items-center bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-2xl shadow-lg text-center transition"
        >
          <DollarSign size={32} className="mb-2" />
          <span className="font-semibold text-lg">Financing Requests</span>
        </Link>
      </div>

      {/* Car Inventory Section */}
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Inventory</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}

      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars found.</p>
      ) : (
        <div className="grid gap-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex items-center justify-between border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {car.year} {car.make} {car.model}
                </p>
                <p className="text-gray-500 text-sm">
                  ${car.price.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/edit-car/${car.id}`}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <Pencil size={16} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
