import React, { useState } from "react";
import axios from "axios";
import { BadgeDollarSign, Clock4, Handshake } from "lucide-react";

export default function Financing() {
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

  const validateForm = () => {
    const { firstName, lastName, email, phone } = form;
    if (!firstName || !lastName || !email) {
      setError("Please fill out all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (
      phone &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
    ) {
      setError("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.post(
        "https://clutch-auto-sales.onrender.com/api/forms/financing",
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
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-black text-white py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pages-hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Financing</h1>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: (
                <BadgeDollarSign className="w-10 h-10 text-red-600 mx-auto" />
              ),
              title: "Low Interest Rates",
              desc: "We work with trusted lenders to offer great rates.",
            },
            {
              icon: <Clock4 className="w-10 h-10 text-red-600 mx-auto" />,
              title: "Quick Approvals",
              desc: "Apply in minutes, drive off the same day.",
            },
            {
              icon: <Handshake className="w-10 h-10 text-red-600 mx-auto" />,
              title: "No Pressure",
              desc: "Our team is here to help you, not push you.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl border hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="relative py-20 px-6 text-white bg-center bg-cover mb-20"
        style={{ backgroundImage: "url('/images/bgfinancing.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 ">
            {[
              ["1. Apply", "Fill out the form below to get started."],
              [
                "2. Get Approved",
                "We'll find and discuss the best rates for you.",
              ],
              ["3. Drive Away", "Pick your car and drive off today."],
            ].map(([step, desc]) => (
              <div
                key={step}
                className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/20"
              >
                <h4 className="text-xl font-bold text-white mb-2">{step}</h4>
                <p className="text-gray-200">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-2xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-6">
          Get Pre-Approved Now
        </h2>
        {submitted ? (
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
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
            <h3 className="text-xl font-semibold mb-2 text-black">
              Thank you!
            </h3>
            <p className="text-gray-600 mb-4">
              Your application was received. We'll contact you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md space-y-5"
          >
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name *"
                className="p-4 border rounded-md w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name *"
                className="p-4 border rounded-md w-full"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address *"
              className="p-4 border rounded-md w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-4 border rounded-md w-full"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any questions or preferred vehicle?"
              className="p-4 border rounded-md w-full"
              rows={4}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              Do I need perfect credit to qualify?
            </h3>
            <p className="text-gray-600">
              Not at all, we work with all credit types: good, bad, or none.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              How long does the approval process take?
            </h3>
            <p className="text-gray-600">
              Most applicants hear back within an hour during business hours.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              Can I trade in my current vehicle?
            </h3>
            <p className="text-gray-600">
              Absolutely, we’ll help apply your trade-in value toward your
              financing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
