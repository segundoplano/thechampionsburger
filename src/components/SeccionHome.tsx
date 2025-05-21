// src/components/SeccionHome.tsx
import { motion } from "framer-motion";

export default function SeccionHome() {
  return (
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
          <img src="/galeria/comida1.jpg" alt="Comida 1" className="w-full md:w-1/2 object-cover rounded-lg shadow-lg h-auto" />
          <div className="text-white text-center md:text-left space-y-4">
            <h2 className="text-4xl font-bold" style={{ color: "#ffedd5" }}>¿Qué es Champions Burger?</h2>
            <p className="text-lg">Esta app está diseñada para los fans del campeonato <strong>The Champions Burger</strong>. 
      Aquí podrás explorar todas las hamburguesas participantes, marcarlas como <strong>probadas</strong> o <strong>favoritas</strong>, 
      valorarlas del 1 al 5 con estrellas y llevar un registro personal de tu experiencia. 
      ¡Haz que cada mordisco cuente!</p>
          </div>
        </div>
      </motion.div>

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
          <img src="/galeria/lugar1.jpg" alt="Lugar 1" className="w-full md:w-1/2 object-cover rounded-lg shadow-lg h-auto" />
          <div className="text-white text-center md:text-left space-y-4">
            <h2 className="text-4xl font-bold" style={{ color: "#ede9fe" }}>De ciudad en ciudad</h2>
            <p className="text-lg">Así se vive Champions Burger en diferentes rincones de España.</p>
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
          <img src="/galeria/puesto1.jpg" alt="Puesto 1" className="w-full md:w-1/2 object-cover rounded-lg shadow-lg h-auto" />
          <div className="text-white text-center md:text-left space-y-4">
            <h2 className="text-4xl font-bold" style={{ color: "#dcfce7" }}>Nuestros puestos</h2>
            <p className="text-lg">Cada puesto es único, con identidad propia y sabores auténticos.</p>
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
          <img src="/galeria/gente1.jpg" alt="Gente disfrutando" className="w-full md:w-1/2 object-cover rounded-lg shadow-xl h-auto" />
          <div className="text-white text-center md:text-left space-y-4">
            <h2 className="text-4xl font-bold" style={{ color: "#fce7f3" }}>La experiencia se comparte</h2>
            <p className="text-lg">No solo se trata de comida: se trata de disfrutar juntos. ¡Vívelo!</p>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
