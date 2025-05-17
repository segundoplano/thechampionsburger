// src/hooks/useSignInModalBurger.tsx
import { SignIn } from "@clerk/clerk-react";
import { useState } from "react";

export function useSignInModalBurger() {
  const [isOpen, setIsOpen] = useState(false);

  const SignInModal = () =>
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 relative max-w-md w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            &times;
          </button>
          <SignIn afterSignInUrl="/" />
        </div>
      </div>
    ) : null;

  const open = () => setIsOpen(true);

  return { open, SignInModal };
}
