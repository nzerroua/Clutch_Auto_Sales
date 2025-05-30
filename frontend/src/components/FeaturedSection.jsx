import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedSection() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://your-backend-name.onrender.com/api/cars"
        );
        setCars(response.data.cars || response.data); // Support both old and new formats
        setError(null);
      } catch (err) {
        console.error("Failed to fetch featured vehicles:", err);
        setError("Unable to load featured vehicles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);
  useEffect(() => {
    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

          scrollRef.current.scrollBy({
            left: isAtEnd ? -scrollLeft : 300,
            behavior: "smooth",
          });
        }
      }, 5000);
    };

    startAutoScroll();

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gray-50 pt-4 pb-12 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Featured Vehicles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Discover our premium selection of certified pre-owned vehicles
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="hidden md:block absolute z-10 top-1/2 -translate-y-1/2 left-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition duration-200"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="hidden md:block absolute z-10 top-1/2 -translate-y-1/2 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition duration-200"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Car Cards Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 no-scrollbar"
            >
              {cars.map((car) => (
                <div key={car.id} className="snap-start shrink-0 w-80">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/inventory"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300 shadow-md md:px-10 md:py-4 md:text-lg"
          >
            View Full Inventory
          </a>
        </div>
      </div>
    </section>
  );
}
