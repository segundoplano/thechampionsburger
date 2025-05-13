import "../styles/global.css";

export default function MainLayout({
  children,
  title = "Champions Burger",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body className="bg-[#fafafa] text-gray-800 min-h-screen">
        <header className="w-full border-b border-gray-300 px-6 py-4 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🍔 Champions Burger</h1>
        </header>
        <main className="max-w-3xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
