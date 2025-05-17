import { useState } from "react";
import { SignIn } from "@clerk/clerk-react";

export function useSignInModal() {
  const [open, setOpen] = useState(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    component: open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 relative max-w-md w-full">
          <SignIn afterSignInUrl="/misburgers" />
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ❌
          </button>
        </div>
      </div>
    ),
  };
}
