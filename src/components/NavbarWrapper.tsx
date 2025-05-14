// src/components/NavbarWrapper.tsx
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from './Navbar.tsx';

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function NavbarWrapper() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Navbar />
    </ClerkProvider>
  );
}