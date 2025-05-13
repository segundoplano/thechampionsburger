import "../styles/global.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  // Fix temporal para evitar error de Clerk en modo SSR (puede variar según uso)
  useEffect(() => {}, []);

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="es">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Champions Burger</title>
        </head>
        <body className="bg-white text-black dark:bg-black dark:text-white">
          {/* NAVBAR */}
          <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
            <div className="text-xl font-bold">🍔 Champions Burger</div>
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  userProfileMode="navigation"
                  userProfileUrl="/mis-burgers"
                />
              </SignedIn>
            </div>
          </nav>

          {/* CONTENIDO */}
          <main className="px-6 py-4">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
