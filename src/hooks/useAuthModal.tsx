import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

export function useAuthModal(defaultRedirectUrl = "/") {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(defaultRedirectUrl);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const open = (options?: { redirectUrl?: string; mode?: "signin" | "signup" }) => {
    if (options?.redirectUrl) {
      setRedirectUrl(options.redirectUrl);
    }
    if (options?.mode) {
      setMode(options.mode);
    }
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const AuthModal = () =>
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <button
          onClick={close}
          className="absolute top-6 right-6 z-50 text-gray-400 hover:text-gray-600 text-3xl leading-none"
        >
          ×
        </button>

        {mode === "signin" ? (
          <SignIn
            afterSignInUrl={redirectUrl}
            appearance={{
              elements: {
                closeButton: "hidden",
                card: "rounded-xl shadow-2xl border border-gray-200",
                headerTitle: "text-xl font-bold",
                socialButtonsBlockButton: "bg-white border hover:bg-gray-100",
                formFieldInput: "rounded-md border-gray-300 focus:ring-purple-500",
                footerActionLink: "text-purple-600 hover:underline",
                formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              },
            }}
          />
        ) : (
          <SignUp
            afterSignUpUrl={redirectUrl}
            afterSignInUrl={redirectUrl}
            appearance={{
              elements: {
                closeButton: "hidden",
                card: "rounded-xl shadow-2xl border border-gray-200",
                headerTitle: "text-xl font-bold",
                socialButtonsBlockButton: "bg-white border hover:bg-gray-100",
                formFieldInput: "rounded-md border-gray-300 focus:ring-purple-500",
                footerActionLink: "text-purple-600 hover:underline",
                formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              },
            }}
          />

        )}
      </div>
    ) : null;

  return { open, close, AuthModal };
}
