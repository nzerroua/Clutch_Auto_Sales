// File: src/pages/AddCar.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

export default function AddCar() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    style: "",
    year: "",
    price: "",
    mileage: "",
    description: "",
    transmission: "",
    drivetrain: "",
    fuelType: "",
    exteriorColor: "",
    interiorColor: "",
    engine: "",
    vin: "",
    features: "",
  });

  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (error || success) {
      window.scrollTo({
        top: messageRef.current?.offsetTop - 20,
        behavior: "smooth",
      });
    }
  }, [error, success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      setError("You can upload up to 10 images only.");
      setImages([]);
      return;
    }
    setError("");
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "features") {
        value
          .split(",")
          .map((f) => f.trim())
          .forEach((feature) => {
            formData.append("features", feature);
          });
      } else {
        formData.append(key, value);
      }
    });

    images.forEach((img) => formData.append("images", img));

    try {
      const token = localStorage.getItem("admin_token");

      const res = await axios.post("http://localhost:5000/api/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setSuccess(true);
        setForm({
          make: "",
          model: "",
          style: "",
          year: "",
          price: "",
          mileage: "",
          description: "",
          transmission: "",
          drivetrain: "",
          fuelType: "",
          exteriorColor: "",
          interiorColor: "",
          engine: "",
          vin: "",
          features: "",
        });
        setImages([]);
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error("Error adding car:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to create car");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Add New Car
      </h1>

      <div ref={messageRef}>
        {success && (
          <p className="text-green-600 text-center mb-4">
            ✅ Car added successfully!
          </p>
        )}
        {error && <p className="text-red-600 text-center mb-4">❌ {error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          { name: "make", placeholder: "Make" },
          { name: "model", placeholder: "Model" },
          { name: "style", placeholder: "Style" },
          { name: "year", placeholder: "Year", type: "number" },
          { name: "price", placeholder: "Price", type: "number" },
          { name: "mileage", placeholder: "Mileage", type: "number" },
          { name: "transmission", placeholder: "Transmission" },
          { name: "drivetrain", placeholder: "Drivetrain" },
          { name: "fuelType", placeholder: "Fuel Type" },
          { name: "exteriorColor", placeholder: "Exterior Color" },
          { name: "interiorColor", placeholder: "Interior Color" },
          { name: "engine", placeholder: "Engine" },
          { name: "vin", placeholder: "VIN" },
          { name: "features", placeholder: "Features (comma separated)" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            type={field.type || "text"}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center gap-3">
          <UploadCloud size={24} className="text-gray-600" />
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="border border-gray-300 rounded-lg p-3 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-semibold transition"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
