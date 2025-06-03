// File: src/pages/Contact.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { firstName, lastName, email, phone } = form;

    if (!firstName || !lastName || !email) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (
      phone &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
    ) {
      setError("Please enter a valid phone number.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://clutchautosales-production.up.railway.app/api/forms/contact",
        form
      );

      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-black text-white py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pages-hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
        </div>
      </section>

      {/* Contact + Dealer Info */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        {submitted ? (
          <div className="bg-white shadow-md rounded-xl p-6 text-center w-full">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">
              Thank you for reaching out!
            </h2>
            <p className="text-gray-600 mb-6">
              We've received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 mb-4">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={form.firstName}
                onChange={handleChange}
                className="p-4 border rounded-md w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={form.lastName}
                onChange={handleChange}
                className="p-4 border rounded-md w-full"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              className="p-4 border rounded-md w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="p-4 border rounded-md w-full"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="p-4 border rounded-md w-full"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-red-700 text-white py-3 w-full rounded-lg hover:bg-red-900 transition font-semibold ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        {/* Dealer Info */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-full">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Clutch Auto Sales</h3>
              <p className="text-gray-600">
                2721 Broadway St, Anderson, IN 46012
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-full">
              <FaPhone className="text-white text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Sales Department
              </h4>
              <a
                href="tel:7656356059"
                className="text-red-600 text-lg font-medium hover:underline"
              >
                (765) 635-6059
              </a>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-full">
              <FaClock className="text-white text-lg" />
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-gray-900 mb-3">
                Business Hours
              </h4>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  {[
                    ["Monday - Thursday", "10:00 AM – 6:00 PM"],
                    ["Friday", "10:00 AM – 6:00 PM"],
                    ["Saturday", "10:00 AM – 6:00 PM"],
                    ["Sunday", "Closed"],
                  ].map(([day, hours]) => (
                    <tr
                      key={day}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-2 font-medium">{day}</td>
                      <td className="py-2 text-right">{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Large Map */}
      <div className="w-full h-[500px] px-6 pb-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.698081042529!2d-85.67793!3d40.145763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8814d3c4c3b0a3f7%3A0x58c0e3742b6f4571!2s2721%20Broadway%20St%2C%20Anderson%2C%20IN%2046012!5e0!3m2!1sen!2sus!4v1713621549577!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-xl shadow-xl"
        ></iframe>
      </div>
    </div>
  );
}
