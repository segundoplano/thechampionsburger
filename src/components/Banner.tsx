// src/components/Banner.tsx
import { motion } from "framer-motion";

export default function Banner() {
  return (
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
          Champions Burger 
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
  );
}
