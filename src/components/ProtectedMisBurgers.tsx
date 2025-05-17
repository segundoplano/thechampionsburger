import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useSignInModal } from "../hooks/useSignInModal";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import StarRating from "./StarRating";

export default function ProtectedMisBurgers() {
  const { user } = useUser();
  const { open, component: signInModal } = useSignInModal(); 
  const [misBurgers, setMisBurgers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [alergenos, setAlergenos] = useState<string[]>([]);
  const [selectedAlergenos, setSelectedAlergenos] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    async function fetchMisBurgers() {
      const { data, error } = await supabase
        .from("hamburguesas_probadas")
        .select("puntuacion, hamburguesas(*, hamburguesa_alergenos(alergenos(nombre)))")
        .eq("usuario_id", user.id);

      if (data) {
        setMisBurgers(data);

        // Extraer alérgenos únicos
        const allAlergenos = data
          .flatMap((item) => item.hamburguesas.hamburguesa_alergenos || [])
          .map((item) => item.alergenos?.nombre)
          .filter((x, i, arr) => x && arr.indexOf(x) === i);

        setAlergenos(allAlergenos);
      }

      setLoading(false);
    }

    fetchMisBurgers();
  }, [user]);

  const filteredBurgers = misBurgers.filter((item) => {
    const matchesSearch = item.hamburguesas.nombre
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesAlergenos =
      selectedAlergenos.length === 0 ||
      (item.hamburguesas.hamburguesa_alergenos || []).some((al) =>
        selectedAlergenos.includes(al.alergenos.nombre)
      );

    return matchesSearch && matchesAlergenos;
  });

  return (
    <>
      {signInModal} {/* 👈 Aquí para que se renderice sobre todo */}

      <SignedOut>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">¡Ups! Debes iniciar sesión para ver tus hamburguesas 🍔</h1>
          <button
            onClick={open} // ✅ Limpito
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Iniciar sesión ahora
          </button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Tus hamburguesas guardadas 🍔</h1>

          {/* ✅ Buscador */}
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="border rounded px-3 py-2 w-full max-w-md mb-4"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* ✅ Filtros por alérgenos */}
          {alergenos.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-4">
              {alergenos.map((alerg) => (
                <label key={alerg} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedAlergenos.includes(alerg)}
                    onChange={(e) => {
                      setSelectedAlergenos((prev) =>
                        e.target.checked
                          ? [...prev, alerg]
                          : prev.filter((a) => a !== alerg)
                      );
                    }}
                  />
                  {alerg}
                </label>
              ))}
            </div>
          )}

          {/* ✅ Burgers filtradas */}
          {loading ? (
            <p>Cargando tus burgers...</p>
          ) : filteredBurgers.length === 0 ? (
            <p>No hay burgers que coincidan con tu búsqueda 😢</p>
          ) : (
            <ul className="space-y-4">
              {filteredBurgers.map((item) => (
                <li
                  key={item.hamburguesas.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <h2 className="text-lg font-semibold">{item.hamburguesas.nombre}</h2>
                  <img
                    src={item.hamburguesas.imagen_url}
                    alt={item.hamburguesas.nombre}
                    className="w-full max-w-md rounded-lg my-2"
                  />
                  <p className="text-gray-700">{item.hamburguesas.descripcion}</p>

                  <StarRating
                    initialRating={item.puntuacion}
                    readOnly
                  />

                  {/* Mostrar alergenos */}
                  {item.hamburguesas.hamburguesa_alergenos?.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600 flex flex-wrap gap-2">
                      {item.hamburguesas.hamburguesa_alergenos.map((al) => (
                        <span
                          key={al.alergenos.nombre}
                          className="bg-yellow-100 px-2 py-1 rounded-full"
                        >
                          {al.alergenos.nombre}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </SignedIn>
    </>
  );
}
