import { useEffect, useState } from "react";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFirst, setShowFirst] = useState(true); // Controls which layer is visible
  const [bg1, setBg1] = useState(images[0]);
  const [bg2, setBg2] = useState(images[1]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;

      if (showFirst) {
        setBg2(images[nextIndex]);
      } else {
        setBg1(images[nextIndex]);
      }

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setShowFirst((prev) => !prev);
      }, 500); // matches fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, showFirst]);

  const getOpacity = (isFirst) =>
    showFirst === isFirst ? "opacity-100 z-10" : "opacity-0 z-0";

  return (
    <section className="relative w-full h-screen -mt-20 overflow-hidden">
      {/* Background Layer 1 */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1100ms] ${getOpacity(
          true
        )}`}
        style={{ backgroundImage: `url(${bg1})` }}
      />

      {/* Background Layer 2 */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1100ms] ${getOpacity(
          false
        )}`}
        style={{ backgroundImage: `url(${bg2})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-black/50" />

      {/* Foreground Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center text-white px-4">
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
                onClick={() => {
                  setCurrentIndex(index);
                  if (showFirst) {
                    setBg2(images[index]);
                  } else {
                    setBg1(images[index]);
                  }
                  setShowFirst((prev) => !prev);
                }}
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
