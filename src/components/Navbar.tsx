import {
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathname, setPathname] = useState("");
  const [modalType, setModalType] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) =>
    pathname === path
      ? "text-purple-600 underline"
      : "text-gray-700 hover:text-purple-600";

  return (
   <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <a
        href="/"
        className="inline-block px-4 py-2 text-xl font-extrabold tracking-tight text-purple-700 hover:scale-105 transition-transform duration-200"
      >
        Champions <span className="text-gray-800">Burger</span>
      </a>



      {/* Botón hamburguesa */}
      <button
        className="lg:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖️" : "☰"}
      </button>

      {/* Navegación desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <a
      href="/burger"
      className={`text-sm no-underline font-medium transition-transform duration-200 hover:scale-105 ${isActive("/burger")}`}
    >

          Burgers
        </a>

        {user && (
          <a
          href="/misburgers"
          className={`text-sm no-underline font-medium transition-transform duration-200 hover:scale-105 ${isActive("/misburgers")}`}
        >

            Mis Burgers
          </a>
        )}

        <SignedOut>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setModalType("signin");
              setShowModal(true);
            }}
            className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 hover:scale-105 transition-transform duration-200"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => {
              setModalType("signup");
              setShowModal(true);
            }}
            className="text-sm font-medium bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
          >
            Registrarse
          </button>
        </div>
      </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl={pathname} />
        </SignedIn>
      </div>

      {/* Modal de inicio de sesión */}
      
    <SignedOut>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-6 right-6 z-50 text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            ×
          </button>

          {modalType === "signin" ? (
            <SignIn
              redirectUrl={pathname}
              appearance={{
                elements: {
                  closeButton: "hidden",
                  card: "rounded-xl shadow-2xl border border-gray-200",
                  headerTitle: "text-xl font-bold",
                  socialButtonsBlockButton:
                    "bg-white border hover:bg-gray-100 text-black",
                  formFieldInput:
                    "rounded-md border-gray-300 focus:ring-purple-500",
                  footerActionLink: "text-purple-600 hover:underline",
                  formButtonPrimary:
                    "bg-purple-600 hover:bg-purple-700 text-white",
                },
              }}
            />
          ) : (
            <SignUp
              redirectUrl={pathname}
              appearance={{
                elements: {
                  closeButton: "hidden",
                  card: "rounded-xl shadow-2xl border border-gray-200",
                  headerTitle: "text-xl font-bold",
                  socialButtonsBlockButton:
                    "bg-white border hover:bg-gray-100 text-black",
                  formFieldInput:
                    "rounded-md border-gray-300 focus:ring-purple-500",
                  footerActionLink: "text-purple-600 hover:underline",
                  formButtonPrimary:
                    "bg-purple-600 hover:bg-purple-700 text-white",
                },
              }}
            />
          )}
        </div>
      )}
    </SignedOut>

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
              className={`text-lg font-medium ${isActive("/burger")} no-underline hover:text-purple-600 hover:scale-105 transition duration-200`}
              onClick={() => setMenuOpen(false)}
            >
              🍔 Burgers
            </a>

            {user && (
              <a
                href="/misburgers"
                className={`text-lg font-medium ${isActive("/misburgers")} no-underline hover:text-purple-600 hover:scale-105 transition duration-200`}
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
                  <UserButton afterSignOutUrl={pathname} />
                </div>
              </SignedIn>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
