import { useState } from "react";
import { SignIn } from "@clerk/clerk-react";

export function useSignInModal(defaultRedirectUrl = "/") {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(defaultRedirectUrl);

  const open = (options?: { redirectUrl?: string }) => {
    if (options?.redirectUrl) {
      setRedirectUrl(options.redirectUrl);
    }
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const SignInModal = () =>
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Botón ❌ flotante fuera del card */}
        <button
          onClick={close}
          className="absolute top-6 right-6 z-50 text-gray-400 hover:text-gray-600 text-3xl leading-none"
        >
          ×
        </button>

        <SignIn
          afterSignInUrl={redirectUrl}
          appearance={{
            elements: {
              closeButton: "hidden", // Oculta la X por defecto de Clerk
              card: "rounded-xl shadow-2xl border border-gray-200",
              headerTitle: "text-xl font-bold",
              socialButtonsBlockButton: "bg-white border hover:bg-gray-100",
              formFieldInput: "rounded-md border-gray-300 focus:ring-purple-500",
              footerActionLink: "text-purple-600 hover:underline",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
            },
          }}
        />
      </div>
    ) : null;

  return { open, close, SignInModal };
}
