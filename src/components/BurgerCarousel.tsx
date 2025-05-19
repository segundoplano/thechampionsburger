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
  const [currentIndex, setCurrentIndex] = useState(1); // Empezamos en el "primer real"
  const [transition, setTransition] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    async function fetchBurgers() {
      const { data, error } = await supabase.from<Burger>("hamburguesas").select("*").limit(5);
      if (error) return console.error("Error cargando hamburguesas:", error);
      if (data && data.length > 0) {
        // Agregamos el primero al final y el último al principio para el efecto infinito
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
  }, [currentIndex, burgers]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setTransition(true);
  };

  const handleTransitionEnd = () => {
    // Si llegamos al duplicado del final, reseteamos al primero real sin animación
    if (currentIndex === burgers.length - 1) {
      setTransition(false);
      setCurrentIndex(1); // Primer real
    }
    // Si vamos hacia atrás y estamos en el duplicado del principio
    else if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(burgers.length - 2); // Último real
    }
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  const transformValue = `translateX(-${currentIndex * ITEM_WIDTH}px)`;

  return (
    <section className="py-16 px-4 text-center bg-black text-white mb-16">
      <h2 className="text-4xl font-bold mb-6">Bienvenido a Champions Burger</h2>
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
                style={{ width: `${ITEM_WIDTH}px`, height: "600px" }}
                onMouseEnter={resetTimeout} 
                onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                    goTo(currentIndex + 1);
                    }, 5000);
                }}
                >
              <div
                ref={sliderRef}
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
                        className="w-36 h-36 object-contain mb-4 rounded-xl"
                      />
                    )}
                    <img
                      src={burger.imagen_url}
                      alt={burger.nombre}
                      className="rounded-xl shadow-lg object-cover mb-4"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "300px",
                        borderRadius: "24px",
                      }}
                    />
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
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
            Ver más
            </motion.button>
          {/* Puntos indicadores */}
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
