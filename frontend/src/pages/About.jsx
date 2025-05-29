import React from "react";
import { Car, Handshake, ShieldCheck, Target } from "lucide-react";

export default function About() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-black text-white py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pages-hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            About Clutch Auto Sales
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-4xl mx-auto text-center px-6 py-16">
        <p className="text-lg text-gray-700 leading-relaxed">
          At Clutch Auto Sales, we go beyond selling cars. We're a local
          family-run business committed to helping our community find reliable,
          affordable vehicles. Whether it’s your first ride or your dream
          upgrade, we treat you with honesty, respect, and care.
        </p>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 mb-20 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: (
              <ShieldCheck className="h-10 w-10 text-red-600 mx-auto mb-4" />
            ),
            title: "Reliable Vehicles",
            desc: "Every car is inspected for safety, performance, and long-term reliability before hitting the lot.",
          },
          {
            icon: <Handshake className="h-10 w-10 text-red-600 mx-auto mb-4" />,
            title: "Transparent Service",
            desc: "We’re upfront about every detail. No gimmicks. No pressure. Just real deals and real people.",
          },
          {
            icon: <Car className="h-10 w-10 text-red-600 mx-auto mb-4" />,
            title: "Customer First",
            desc: "We focus on relationships, not transactions. Most of our sales come from referrals and repeat buyers.",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-md"
          >
            {icon}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* MISSION with BACKGROUND */}
      <section
        className="relative py-20 bg-cover bg-center text-white mb-20 px-6"
        style={{ backgroundImage: "url('/images/bgabout.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Target className="h-12 w-12 text-red-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-200">
            Our mission is to make car shopping easy, transparent, and
            stress-free for everyone. We believe trust is earned, not assumed,
            and we earn it with every handshake, every mile, and every satisfied
            customer.
          </p>
        </div>
      </section>

      {/* CTA BUTTONS */}
      <div className="text-center mb-20 space-x-4">
        <a
          href="/inventory"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          Browse Our Inventory
        </a>
        <a
          href="/contact"
          className="inline-block bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
