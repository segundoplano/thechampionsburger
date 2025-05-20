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

const ITEM_WIDTH = 400;

export default function BurgerCarousel() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    async function fetchBurgers() {
      const { data, error } = await supabase.from<Burger>("hamburguesas").select("*").limit(5);
      if (error) return console.error("Error cargando hamburguesas:", error);
      if (data && data.length > 0) {
        const extended = [data[data.length - 1], ...data, data[0]];
        setBurgers(extended);
      }
    }
    fetchBurgers();
  }, []);

  useEffect(() => {
    if (burgers.length === 0) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      goTo(currentIndex + 1);
    }, 5000);

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
    if (currentIndex === burgers.length - 1) {
      setTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(burgers.length - 2);
    }
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);
  const transformValue = `translateX(-${currentIndex * ITEM_WIDTH}px)`;

  return (
    <section className="py-16 px-4 text-center bg-black text-white mb-16">
      <h2 className="text-4xl font-bold mb-8">Descubre las mejores hamburguesas de este 2025</h2>
      {burgers.length === 0 ? (
        <p>Cargando hamburguesas...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-8 relative">
            <button
              onClick={prev}
              aria-label="Anterior hamburguesa"
              className="bg-white text-black px-6 py-3 rounded text-2xl font-bold z-20 transition-transform hover:scale-110 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              ‹
            </button>
            <div
              className="overflow-hidden"
              style={{ width: `${ITEM_WIDTH}px`, height: "500px" }}
              onMouseEnter={resetTimeout}
              onMouseLeave={() => {
                resetTimeout();
                timeoutRef.current = setTimeout(() => {
                  goTo(currentIndex + 1);
                }, 5000);
              }}
            >
              <div
                className="flex"
                style={{
                  width: `${burgers.length * ITEM_WIDTH}px`,
                  transform: transformValue,
                  transition: transition ? "transform 0.5s ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {burgers.map((burger, i) => (
                  <div
                    key={`${burger.id}-${i}`}
                    className="flex-shrink-0 flex flex-col items-center"
                    style={{ width: `${ITEM_WIDTH}px` }}
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
                        aria-label={`Ver detalles de la burger ${burger.nombre}`}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-black text-white text-sm py-2 px-6 rounded-full transition-all duration-500"
                      >
                        Ver detalles
                      </a>
                    </div>
                    <h3 className="text-3xl font-semibold text-center">{burger.nombre}</h3>
                    <p className="mt-2 text-sm italic text-center px-4">{burger.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={next}
              aria-label="Siguiente hamburguesa"
              className="bg-white text-black px-6 py-3 rounded text-2xl font-bold z-20 transition-transform hover:scale-110 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              ›
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ver más hamburguesas"
            onClick={() => (window.location.href = "/burger")}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Ver más
          </motion.button>

          <div className="mt-6 flex justify-center gap-2">
            {burgers.slice(1, burgers.length - 1).map((burger, index) => (
              <button
                key={index}
                onClick={() => goTo(index + 1)}
                aria-label={`Ir a la hamburguesa ${burger.nombre}`}
                className={`text-2xl transition-all duration-200 transform hover:scale-150 focus:outline-none focus:ring-2 focus:ring-white rounded-full ${
                  currentIndex === index + 1 ? "text-white" : "text-white/40"
                }`}
              >
                {currentIndex === index + 1 ? "●" : "○"}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
