// src/components/MisBurgersPageWrapper.tsx
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import ProtectedMisBurgers from "./ProtectedMisBurgers";

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function MisBurgersPageWrapper() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <div className="w-full px-4">
        <Navbar />
        <ProtectedMisBurgers />
      </div>
    </ClerkProvider>
  );
}
