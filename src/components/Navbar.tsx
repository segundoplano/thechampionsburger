// src/components/Navbar.tsx
import { UserButton, SignedIn, SignedOut, useUser, SignIn } from "@clerk/clerk-react";
import { useState } from "react";

export default function Navbar() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const isActive = (path: string) => window.location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <a href="/" className="flex items-center gap-2 text-xl font-bold">
        🍔 Champions Burger
      </a>

      <div className="flex items-center gap-6">
        <a
          href="/burger"
          className={`text-sm font-medium ${
            isActive("/burger") ? "text-purple-600 underline" : "text-gray-700 hover:text-purple-600"
          }`}
        >
          Burgers
        </a>

        {user && (
          <a
            href="/misburgers"
            className={`text-sm font-medium ${
              isActive("/misburgers") ? "text-purple-600 underline" : "text-gray-700 hover:text-purple-600"
            }`}
          >
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
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ❌
                </button>
                <SignIn
                  redirectUrl={window.location.pathname}
                  appearance={{
                    elements: {
                      card: "shadow-xl rounded-xl",
                      headerTitle: "text-2xl font-bold text-center",
                      socialButtonsBlockButton: "bg-black hover:bg-gray-800 text-white",
                      formFieldLabel: "text-gray-700",
                      formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
                    },
                  }}
                />

              </div>
            </div>
          )}
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl={window.location.pathname} />
        </SignedIn>
      </div>
    </nav>
  );
}


