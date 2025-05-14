// src/components/NavbarProviderWrapper.tsx
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "./Navbar";

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function NavbarProviderWrapper() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Navbar />
    </ClerkProvider>
  );
}
