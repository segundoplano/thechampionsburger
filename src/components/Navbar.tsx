// src/components/Navbar.tsx
import { UserButton, SignedIn, SignedOut, useUser, SignIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [pathname, setPathname] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Se asegura de que pathname se actualice solo en cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) =>
    pathname === path ? "text-purple-600 font-semibold" : "text-gray-800 hover:text-purple-600";

  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 text-xl font-bold">
        <span className="font-extrabold text-xl tracking-tight text-purple-700">
          Champions <span className="text-gray-800">Burger</span>
        </span>
      </a>

      {/* Menu hamburguesa para móviles */}
      <button
        className="lg:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖️" : "☰"}
      </button>

      {/* Navegación desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <a href="/burger" className={`${isActive("/burger")} transition-colors`}>
          Burgers
        </a>
        {user && (
          <a href="/misburgers" className={`${isActive("/misburgers")} transition-colors`}>
            Mis Burgers
          </a>
        )}

        <SignedOut>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Iniciar sesión
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl={window.location.pathname} />
        </SignedIn>
      </div>

      {/* Navegación móvil */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fondo oscuro */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel lateral */}
            <motion.div
              key="sidebar"
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="self-end text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setMenuOpen(false)}
              >
                ❌
              </button>

              <a
                href="/burger"
                className={`${isActive("/burger")} text-lg transition-colors`}
                onClick={() => setMenuOpen(false)}
              >
                🍔 Burgers
              </a>

              {user && (
                <a
                  href="/misburgers"
                  className={`${isActive("/misburgers")} text-lg transition-colors`}
                  onClick={() => setMenuOpen(false)}
                >
                  ⭐ Mis Burgers
                </a>
              )}

              <SignedOut>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-sm"
                >
                  Iniciar sesión
                </button>
              </SignedOut>

              <SignedIn>
                <div className="pt-4">
                  <UserButton afterSignOutUrl={window.location.pathname} />
                </div>
              </SignedIn>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
}
