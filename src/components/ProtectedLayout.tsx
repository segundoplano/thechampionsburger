// src/components/ProtectedLayout.tsx
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedMisBurgers from "./ProtectedMisBurgers";

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function ProtectedLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ProtectedMisBurgers />
    </ClerkProvider>
  );
}
