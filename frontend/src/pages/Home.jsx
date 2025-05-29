import React from "react";
import FeaturedSection from "../components/FeaturedSection";
import HeroSection from "../components/HeroSection";
import {
  FaCar,
  FaShieldAlt,
  FaMoneyBillWave,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import {
  CarFront,
  Car,
  Truck,
  CarTaxiFront,
  BusFront,
  BatteryCharging,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <HeroSection />
      {/* FEATURED SECTION */}
      <main className="max-w-[1400px] mx-auto px-4 py-16">
        <FeaturedSection />
      </main>
      {/* STATS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url('/images/statsbg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/15">
              <div className="text-red-500 text-4xl mb-3 flex justify-center">
                <FaCar />
              </div>
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p className="text-gray-200">Vehicles in Stock</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/15">
              <div className="text-red-500 text-4xl mb-3 flex justify-center">
                <FaShieldAlt />
              </div>
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p className="text-gray-200">Vehicle History Reports</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/15">
              <div className="text-red-500 text-4xl mb-3 flex justify-center">
                <FaMoneyBillWave />
              </div>
              <h3 className="text-2xl font-bold mb-2">$100k+</h3>
              <p className="text-gray-200">Saved by Customers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/15">
              <div className="text-red-500 text-4xl mb-3 flex justify-center">
                <FaStar />
              </div>
              <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
              <p className="text-gray-200">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>
      {/* BROWSE BY STYLE SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Browse by Vehicle Type
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect vehicle for your lifestyle and needs
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              { name: "SUVs", icon: CarFront },
              { name: "Sedans", icon: Car },
              { name: "Trucks", icon: Truck },
              { name: "Coupes", icon: Car },
              { name: "Convertibles", icon: CarTaxiFront },
              { name: "Minivans", icon: BusFront },
              { name: "Hybrids", icon: BatteryCharging },
              { name: "Electric", icon: Zap },
            ].map(({ name, icon: Icon }) => (
              <a
                key={name}
                href={`/inventory?style=${name.toLowerCase()}`}
                className="group bg-gray-100 hover:bg-red-600 hover:text-white rounded-xl p-6 text-center shadow transition duration-300"
              >
                <Icon className="mx-auto mb-4 h-10 w-10 text-red-600 group-hover:text-white transition" />
                <h3 className="font-semibold text-lg">{name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section
        className="relative py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/testimonialsbg.jpg')" }} // adjust path if needed
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4">
          <div className="mb-12 text-left">
            <h2 className="text-3xl font-bold mb-4 text-white">
              What Our Customers Say
            </h2>
            <p className="text-gray-200 max-w-xl">
              Don't just take our word for it – hear from our satisfied
              customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Found my dream car at a great price! The team at Clutch Auto made the process so easy.",
                name: "Michael T.",
                rating: 5,
              },
              {
                quote:
                  "Honest dealership with no pressure sales. They helped me find exactly what I needed within my budget.",
                name: "Sarah J.",
                rating: 5,
              },
              {
                quote:
                  "Best car buying experience I've ever had. The vehicle was even better than described!",
                name: "David P.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-md text-white"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <p className="font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section
        className="relative bg-white py-24 overflow-hidden"
        style={{
          backgroundImage: "url('/images/bgwhychooseus.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-black mb-4">
              Why Choose Clutch Auto Sales
            </h2>
            <p className="text-gray-600 text-md max-w-2xl mx-auto">
              We focus on quality, honesty, and providing a refined car buying
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: <FaShieldAlt className="text-red-700 text-2xl" />,
                title: "Quality Assurance",
                desc: "Every car is carefully inspected and certified for lasting performance and safety.",
              },
              {
                icon: <FaMoneyBillWave className="text-red-700 text-2xl" />,
                title: "Transparent Pricing",
                desc: "Clear, fair pricing with no hidden fees. What you see is what you pay.",
              },
              {
                icon: <FaCar className="text-red-700 text-2xl" />,
                title: "Diverse Inventory",
                desc: "A wide selection of vehicles to match every lifestyle and need.",
              },
              {
                icon: <FaStar className="text-red-700 text-2xl" />,
                title: "5-Star Support",
                desc: "Exceptional service throughout your entire car buying journey.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-black/15 backdrop-blur-xl border border-white/30 rounded-3xl px-6 py-10 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-100 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US SECTION */}
      <section className="relative bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-black mb-4">
              Visit Our Dealership
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our showroom, speak with our team, and take your dream car
              for a spin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Info Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-10 relative z-10">
              <div className="flex items-start gap-4 mb-8">
                <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-full shadow-md">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Clutch Auto Sales
                  </h3>
                  <p className="text-gray-600">
                    2721 Broadway St, Anderson, IN 46012
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-full shadow-md">
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

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-full shadow-md">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Business Hours
                    </h4>
                    <table className="w-full text-sm">
                      <tbody className="text-gray-700">
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

            {/* Map */}
            <div className="w-full h-[440px] rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.698081042529!2d-85.67793!3d40.145763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8814d3c4c3b0a3f7%3A0x58c0e3742b6f4571!2s2721%20Broadway%20St%2C%20Anderson%2C%20IN%2046012!5e0!3m2!1sen!2sus!4v1713621549577!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* INVENTORY CTA */}
      <section
        className="relative bg-black text-white py-24"
        style={{
          backgroundImage: "url('/images/bgcta.jpg')", // <-- your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50 z-0"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to Find Your Perfect Vehicle?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Browse our hand-selected inventory of quality pre-owned vehicles and
            drive away with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="/inventory"
              className="bg-red-950/90 text-white/90 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:bg-gray-100 hover:text-red-700 transition duration-300"
            >
              Browse Inventory
            </a>
            <a
              href="/contact"
              className="bg-transparent border border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-red-700 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
