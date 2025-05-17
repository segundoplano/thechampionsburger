// src/hooks/useSignInModal.tsx
import { useState } from "react";
import { SignIn } from "@clerk/clerk-react";

export function useSignInModal(afterSignInUrl = "/") {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const SignInModal = () =>
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 relative max-w-md w-full">
          <SignIn afterSignInUrl={afterSignInUrl} />
          <button
            onClick={close}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl leading-none"
          >
            ❌
          </button>
        </div>
      </div>
    ) : null;

  return { open, close, SignInModal };
}
