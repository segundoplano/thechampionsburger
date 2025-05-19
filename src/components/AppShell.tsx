// src/components/AppShell.tsx
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/global.css";


const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Navbar />
      <main className="max-w-3xl mx-auto p-4">{children}</main>
      <ScrollToTopButton />
      <Footer />
    </ClerkProvider>
  );
}
