import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";

interface Burger {
  id: string;
  nombre: string;
  imagen_url: string;
  logo_url?: string;
  descripcion?: string;
  restaurante?: string;
}

const AUTOPLAY_DELAY = 5000;

export default function BurgerCarousel() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [transition, setTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(420);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Responsive breakpoints
  const updateVisibleCount = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCount(1);
    else if (width < 1024) setVisibleCount(2);
    else setVisibleCount(3);
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.offsetWidth;
      setItemWidth(totalWidth / visibleCount);
    }
    setCurrentIndex(visibleCount);
  }, [visibleCount]);

  useEffect(() => {
    async function fetchBurgers() {
      const { data, error } = await supabase.from<Burger>("hamburguesas").select("*").limit(9);
      if (error) return console.error("Error cargando hamburguesas:", error);
      if (data && data.length >= visibleCount) {
        const clonesBefore = data.slice(-visibleCount);
        const clonesAfter = data.slice(0, visibleCount);
        setBurgers([...clonesBefore, ...data, ...clonesAfter]);
      }
    }
    fetchBurgers();
  }, [visibleCount]);

  useEffect(() => {
    if (burgers.length === 0) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      goTo(currentIndex + 1);
    }, AUTOPLAY_DELAY);
    return () => resetTimeout();
  }, [currentIndex, burgers.length]);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransition(true);
    setCurrentIndex(index);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (currentIndex >= burgers.length - visibleCount) {
      setTransition(false);
      setCurrentIndex(visibleCount);
    } else if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(burgers.length - 2 * visibleCount);
    }
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  return (
    <section className="py-16 px-4 text-center bg-black text-white">
      <h2 className="text-4xl font-bold mb-8">Descubre las mejores hamburguesas de este 2025</h2>
      {burgers.length === 0 ? (
        <p>Cargando hamburguesas...</p>
      ) : (
        <div className="max-w-[1280px] mx-auto" ref={containerRef}>
          <div className="flex items-center justify-center gap-4 relative">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="bg-white text-black px-4 py-2 rounded text-2xl font-bold z-20 hover:scale-110 transition"
            >
              ‹
            </button>

            <div
              className="overflow-hidden"
              style={{ width: "100%" }}
              onMouseEnter={resetTimeout}
              onMouseLeave={() => {
                resetTimeout();
                timeoutRef.current = setTimeout(() => {
                  goTo(currentIndex + 1);
                }, AUTOPLAY_DELAY);
              }}
            >
              <div
                className="flex"
                style={{
                  width: `${(burgers.length / visibleCount) * 100}%`,
                  transform: `translateX(-${(100 / burgers.length) * currentIndex}%)`,
                  transition: transition ? "transform 0.5s ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {burgers.map((burger, i) => (
                  <div
                    key={`${burger.id}-${i}`}
                    className="flex-shrink-0 flex flex-col items-center px-2"
                    style={{ width: `${100 / burgers.length}%` }}
                  >
                    {burger.logo_url && (
                      <img
                        src={burger.logo_url}
                        alt={`${burger.nombre} logo`}
                        className="w-28 h-28 object-contain mb-2 rounded-xl"
                      />
                    )}
                    <div className="relative overflow-hidden group rounded-2xl mb-1 shadow-lg">
                      <img
                        src={burger.imagen_url}
                        alt={burger.nombre}
                        className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-500"></div>
                      <a
                        href={`/burgers/${burger.id}`}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-black text-white text-sm py-2 px-6 rounded-full transition-all duration-500"
                      >
                        Ver detalles
                      </a>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mt-2">{burger.nombre}</h3>
                    <p className="text-sm italic text-center px-4">{burger.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={next}
              aria-label="Siguiente"
              className="bg-white text-black px-4 py-2 rounded text-2xl font-bold z-20 hover:scale-110 transition"
            >
              ›
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/burgers")}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium text-base"
          >
            Ver más
          </motion.button>
        </div>
      )}
    </section>
  );
}
