// File: src/pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import {
  Phone,
  MessageCircle,
  Fuel,
  Gauge,
  Palette,
  Car,
  Settings,
  CalendarDays,
  FileText,
  CheckCircle,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const SUPABASE_PUBLIC_URL =
  "https://yopqiqlfpckbketdxdrm.supabase.co/storage/v1/object/public/car-images/";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://clutchautosales-production.up.railway.app/api/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => {
        console.error(err);
        setError("Car not found or failed to load.");
      });
  }, [id]);

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!car) return <p className="text-center mt-10">Loading...</p>;

  const formatUrl = (url) =>
    url.includes("http") ? url : `${SUPABASE_PUBLIC_URL}${url}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Image Gallery */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        spaceBetween={20}
        slidesPerView={1}
        className="mb-4 rounded-xl overflow-hidden shadow-md"
      >
        {car.imageUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={formatUrl(url)}
              alt={`${car.make} ${car.model} ${idx + 1}`}
              className="w-full h-[500px] object-cover select-none pointer-events-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="mb-12"
      >
        {car.imageUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={formatUrl(url)}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-24 object-cover cursor-pointer border border-gray-300 rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Title + Price */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {car.year} {car.make} {car.model}
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            {car.mileage.toLocaleString()} miles • {car.style}
          </p>
        </div>
        <div className="self-start md:self-auto">
          <div className="bg-red-100 text-red-700 font-bold text-xl px-6 py-2 rounded-full shadow-sm inline-block">
            ${car.price.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Description */}
      {car.description && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            Vehicle Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {car.description}
          </p>
        </div>
      )}

      {/* Specs */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="space-y-4 text-gray-800">
          <h3 className="text-xl font-semibold text-black">Overview</h3>
          <p className="flex items-center gap-2">
            <Car className="w-5 h-5 text-red-600" />
            <strong>Style:</strong> {car.style}
          </p>
          <p className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-red-600" />
            <strong>Mileage:</strong> {car.mileage.toLocaleString()} miles
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-red-600" />
            <strong>Year:</strong> {car.year}
          </p>
          <p className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-600" />
            <strong>Transmission:</strong> {car.transmission || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-600" />
            <strong>Drivetrain:</strong> {car.drivetrain || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Fuel className="w-5 h-5 text-red-600" />
            <strong>Fuel Type:</strong> {car.fuelType || "N/A"}
          </p>
        </div>
        <div className="space-y-4 text-gray-800">
          <h3 className="text-xl font-semibold text-black">Specifications</h3>
          <p className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-red-600" />
            <strong>Exterior:</strong> {car.exteriorColor || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-red-600" />
            <strong>Interior:</strong> {car.interiorColor || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-600" />
            <strong>Engine:</strong> {car.engine || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            <strong>VIN:</strong> {car.vin || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-red-600" />
            <strong>Posted:</strong>{" "}
            {new Date(car.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Key Features */}
      {car.features?.length > 0 && (
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-red-600" />
            Key Features
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
            {car.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                <CheckCircle className="w-4 h-4 text-red-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trade-In Notice */}
      <div className="flex items-center gap-3 bg-gray-100 border border-red-200 text-red-700 px-5 py-4 rounded-xl shadow mb-12 max-w-xl mx-auto text-center justify-center">
        <span className="font-medium">
          Have a vehicle to{" "}
          <span className="text-black font-bold">trade in</span>? Get a great
          offer today!
        </span>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <a
          href="tel:7656356059"
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition"
        >
          <MessageCircle className="w-5 h-5" />
          Message Dealer
        </a>
      </div>
    </div>
  );
}
