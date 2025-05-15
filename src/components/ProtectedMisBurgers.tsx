import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProtectedMisBurgers() {
  const { user } = useUser();
  const [misBurgers, setMisBurgers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (!user) return;

    async function fetchMisBurgers() {
      const { data, error } = await supabase
        .from("hamburguesas_probadas")
        .select("puntuacion, hamburguesas(*)") // ← join con hamburguesas
        .eq("usuario_id", user.id);

      console.log("📦 misBurgers:", data);

      if (data) setMisBurgers(data);
      setLoading(false);
    }

    fetchMisBurgers();
  }, [user]);

    return (
    <>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/" />
      </SignedOut>

      <SignedIn>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Tus hamburguesas guardadas 🍔</h1>
          {loading ? (
            <p>Cargando tus burgers...</p>
          ) : misBurgers.length === 0 ? (
            <p>No has marcado ninguna burger como probada aún 😢</p>
          ) : (
            <ul className="space-y-4">
              {misBurgers.map((item) => (
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
                  {item.puntuacion && (
                    <p className="mt-2">⭐ Puntuación: {item.puntuacion}/5</p>
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
