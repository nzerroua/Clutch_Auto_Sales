// File: src/pages/EditCar.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const fileInputRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://clutch-auto-sales.onrender.com/api/cars/${id}`)
      .then((res) => {
        setForm(res.data);
        setExistingImages(res.data.imageUrls || []);
      })
      .catch(() => setError("Failed to load car data."));
  }, [id]);

  useEffect(() => {
    if (error) {
      window.scrollTo({
        top: messageRef.current?.offsetTop - 20,
        behavior: "smooth",
      });
    }
  }, [error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = (urlToRemove) => {
    const filtered = existingImages.filter((url) => url !== urlToRemove);
    setExistingImages(filtered);
    setForm((prev) => ({ ...prev, imageUrls: filtered }));
  };

  const handleFileChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();

      for (const [key, value] of Object.entries(form)) {
        if (key !== "features") {
          formData.append(key, value ?? "");
        }
      }

      const formattedFeatures =
        typeof form.features === "string"
          ? form.features
          : (form.features || []).join(", ");
      formData.append("features", formattedFeatures);

      existingImages.forEach((url) => formData.append("imageUrls", url));
      newImages.forEach((img) => formData.append("images", img));

      await axios.put(
        `https://clutch-auto-sales.onrender.com/api/cars/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update car.");
    }
  };

  if (!form) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Edit Car
      </h1>

      <div ref={messageRef}>
        {error && <p className="text-red-600 text-center mb-4">❌ {error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          "make",
          "model",
          "style",
          "year",
          "price",
          "mileage",
          "transmission",
          "drivetrain",
          "fuelType",
          "exteriorColor",
          "interiorColor",
          "engine",
          "vin",
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            placeholder={field}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type={
              ["price", "year", "mileage"].includes(field) ? "number" : "text"
            }
          />
        ))}

        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          rows={4}
          placeholder="Description"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="features"
          value={
            typeof form.features === "string"
              ? form.features
              : (form.features || []).join(", ")
          }
          onChange={handleChange}
          placeholder="Features (comma separated)"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <p className="font-semibold mb-2 text-gray-700">Existing Images:</p>
          <div className="grid grid-cols-3 gap-3">
            {existingImages.map((url, idx) => (
              <div key={idx} className="relative">
                <img
                  src={url}
                  alt={`Car ${idx}`}
                  className="w-full h-24 object-cover rounded shadow"
                  onError={() => handleRemoveImage(url)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
