// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="py-6 border-t border-gray-200 bg-white text-center text-sm text-gray-500">
      <div className="flex flex-col items-center gap-2">
        <p>© 2025 Champions Burger. Todos los derechos reservados 🍔</p>
        <p>
          Desarrollado con <span className="text-red-500">❤️</span> por{" "}
          <a
            href="https://github.com/aleexrguez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Alex Rodríguez 
          </a>
          <span>
            , &nbsp;
          </span>
          <a
            href="https://github.com/lygarmo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Lydia García
          </a>
          <span>
            , &nbsp;
          </span>
          <a
            href="https://github.com/natachamar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Natacha del Mar Aguilera
          </a>
        </p>
      </div>
    </footer>
  );
}
