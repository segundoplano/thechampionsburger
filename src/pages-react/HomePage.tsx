import AppShell from "../components/AppShell";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

interface Burger {
  id: string;
  nombre: string;
  imagen_url: string;
  logo_url?: string;
  descripcion?: string;
  restaurante?: string;
}

export default function HomePage() {
  const SUPABASE_URL = "https://igaxrzmkbvlnsyiahpqx.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnYXhyem1rYnZsbnN5aWFocHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzg0OTAsImV4cCI6MjA2MjcxNDQ5MH0.7I85_t29KRtzcrpTJnvrfg6Ox3TLQ3YR0enKzs1L-v4";

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ITEM_WIDTH = 400;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    async function fetchBurgers() {
      const { data, error } = await supabase
        .from<Burger>("hamburguesas")
        .select("*")
        .limit(5); // ✅ Corrección aquí

      if (error) {
        console.error("Error cargando hamburguesas:", error);
        return;
      }

      if (data) setBurgers(data);
    }
    fetchBurgers();
  }, []);

  useEffect(() => {
    if (burgers.length === 0) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % burgers.length);
    }, 5000);
    return () => resetTimeout();
  }, [currentIndex, burgers.length]);

  const nextBurger = () => {
    setCurrentIndex((i) => (i + 1) % burgers.length);
  };

  const prevBurger = () => {
    setCurrentIndex((i) => (i - 1 + burgers.length) % burgers.length);
  };

  return (
    <AppShell>
      {/* Banner */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3 }}
          src="/galeria/banner.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-transparent to-black z-20" />
        <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Champions Burger 🍔
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-6 text-xl text-white drop-shadow-md max-w-xl"
          >
            Las mejores hamburguesas gourmet reunidas en un evento único.
          </motion.p>
        </div>
      </section>

      {/* Carrusel de hamburguesas */}
      <section className="py-16 px-4 text-center bg-black text-white mb-16">
  <h2 className="text-4xl font-bold mb-6">Bienvenido a Champions Burger</h2>
  {burgers.length === 0 ? (
    <p>Cargando hamburguesas...</p>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-8 relative">
        <button
          onClick={prevBurger}
          className="bg-white text-black px-6 py-3 rounded text-2xl font-bold z-20"
        >
          ‹
        </button>

        {/* Carrusel wrapper con overflow oculto */}
        <div
          className="overflow-hidden"
          style={{ width: `${ITEM_WIDTH}px`, height: "600px" }}
        >
          {/* Carrusel deslizante */}
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${burgers.length * ITEM_WIDTH}px`,
              transform: `translateX(-${currentIndex * ITEM_WIDTH}px)`,
            }}
          >
            {burgers.slice(0, 5).map((burger, index) => (
              <div
                key={burger.id}
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
          onClick={nextBurger}
          className="bg-white text-black px-6 py-3 rounded text-2xl font-bold z-20"
        >
          ›
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/burger")}
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded font-semibold text-lg"
      >
        Ver más
      </motion.button>
    </div>
  )}
</section>


      {/* Secciones visuales con animaciones suaves al aparecer */}
      <section className="space-y-24">
        {/* 🍔 COMIDA */}
        <motion.div
          className="w-full py-16 px-6"
          style={{ backgroundColor: "#f97316" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <img
              src="/galeria/comida1.jpg"
              alt="Comida 1"
              className="w-full md:w-1/2 object-cover rounded-lg shadow-lg h-auto"
            />
            <div className="text-white text-center md:text-left space-y-4">
              <h2 className="text-4xl font-bold" style={{ color: "#ffedd5" }}>
                Sabores de otro nivel
              </h2>
              <p className="text-lg">
                Hamburguesas, postres y bebidas que compiten por tu paladar. ¿Cuál será tu
                favorita?
              </p>
            </div>
          </div>
        </motion.div>

        {/* Galería de comida */}
        <div className="px-4 md:px-12 max-w-7xl mx-auto [column-count:1] sm:[column-count:2] md:[column-count:3] gap-4 space-y-4">
          {[...Array(9)].map((_, i) => (
            <motion.img
              key={`comida${i + 2}`}
              src={`/galeria/comida${i + 2}.jpg`}
              alt={`Comida ${i + 2}`}
              className="w-full h-auto object-cover rounded-lg shadow-md break-inside-avoid"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* 📍 LUGARES */}
        <motion.div
          className="w-full py-16 px-6"
          style={{ backgroundColor: "#8b5cf6" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
            <img
              src="/galeria/lugar1.jpg"
              alt="Lugar 1"
              className="w-full md:w-1/2 object-cover rounded-lg shadow-lg h-auto"
            />
            <div className="text-white text-center md:text-left space-y-4">
              <h2 className="text-4xl font-bold" style={{ color: "#ede9fe" }}>
                De ciudad en ciudad
              </h2>
              <p className="text-lg">
                Así se vive Champions Burger en diferentes rincones de España.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="px-4 md:px-12 max-w-7xl mx-auto [column-count:1] sm:[column-count:2] md:[column-count:3] gap-4 space-y-4">
          {[...Array(15)].map((_, i) => (
            <motion.img
              key={`lugar${i + 2}`}
              src={`/galeria/lugar${i + 2}.jpg`}
              alt={`Lugar ${i + 2}`}
              className="w-full h-auto object-cover rounded-lg shadow-md break-inside-avoid"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* 🏪 PUESTOS */}
        <motion.div
          className="w-full py-16 px-6"
          style={{ backgroundColor: "#22c55e" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <img
              src="/galeria/puesto1.jpg"
              alt="Puesto 1"
              className="w-full md:w-1/2 object-cover rounded-lg shadow-lg h-auto"
            />
            <div className="text-white text-center md:text-left space-y-4">
              <h2 className="text-4xl font-bold" style={{ color: "#dcfce7" }}>
                Nuestros puestos
              </h2>
              <p className="text-lg">
                Cada puesto es único, con identidad propia y sabores auténticos.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="px-4 md:px-12 max-w-7xl mx-auto [column-count:1] sm:[column-count:2] md:[column-count:3] gap-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <motion.img
              key={`puesto${i + 2}`}
              src={`/galeria/puesto${i + 2}.jpg`}
              alt={`Puesto ${i + 2}`}
              className="w-full h-auto object-cover rounded-lg shadow-md break-inside-avoid"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* 🙌 GENTE */}
        <motion.div
          className="w-full py-16 px-6"
          style={{ backgroundColor: "#ec4899" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
            <img
              src="/galeria/gente1.jpg"
              alt="Gente disfrutando"
              className="w-full md:w-1/2 object-cover rounded-lg shadow-xl h-auto"
            />
            <div className="text-white text-center md:text-left space-y-4">
              <h2 className="text-4xl font-bold" style={{ color: "#fce7f3" }}>
                La experiencia se comparte
              </h2>
              <p className="text-lg">
                No solo se trata de comida: se trata de disfrutar juntos. ¡Vívelo!
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </AppShell>
  );
}
