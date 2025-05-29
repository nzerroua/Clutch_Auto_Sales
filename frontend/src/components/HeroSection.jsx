import { useEffect, useState } from "react";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToImage = (index) => setCurrentIndex(index);

  return (
    <section className="relative w-full h-screen -mt-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Foreground Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <img
          src="/images/logo.png"
          alt="ClutchAuto Logo"
          className="h-60 w-auto mb-4"
        />

        <div className="relative px-8 py-6 bg-black/35 backdrop-blur-[1.5px] rounded-lg max-w-3xl w-full">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow">
            Drive Your Dream Car Today
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            Explore our wide selection of quality vehicles, unbeatable financing
            options, and exceptional customer service.
          </p>
          <a
            href="/inventory"
            className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-3xl text-lg font-semibold transition"
          >
            Browse Inventory
          </a>
          <div className="flex justify-center gap-1.5 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-6 h-0.5 rounded-full transition ${
                  currentIndex === index ? "bg-white/70" : "bg-white/20"
                }`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}
