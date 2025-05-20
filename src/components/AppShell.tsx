import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </div>
    </ClerkProvider>
  );
}
