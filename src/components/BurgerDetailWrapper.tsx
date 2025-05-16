import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useUser } from "@clerk/clerk-react";
import StarRating from "./StarRating";

type Props = {
  burgerId: string;
};

export default function BurgerDetailWrapper({ burgerId }: Props) {
  const [burger, setBurger] = useState<any>(null);
  const [alergenos, setAlergenos] = useState<any[]>([]);
  const { user } = useUser();
  const [marcada, setMarcada] = useState(false);
  const [puntuacion, setPuntuacion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("hamburguesas")
        .select("*")
        .eq("id", burgerId)
        .single();
      setBurger(data);

      const { data: alergData } = await supabase
        .from("hamburguesa_alergenos")
        .select("alergenos(nombre, icono_url)")
        .eq("hamburguesa_id", burgerId);
      setAlergenos(alergData || []);
    }

    fetchData();
  }, [burgerId]);

  useEffect(() => {
    if (!user) return;

    async function checkProbada() {
      const { data, error } = await supabase
        .from("hamburguesas_probadas")
        .select("*")
        .eq("usuario_id", user.id)
        .eq("hamburguesa_id", burgerId)
        .maybeSingle();

      if (data) {
        setMarcada(true);
        setPuntuacion(data.puntuacion);
      }
    }

    checkProbada();
  }, [user, burgerId]);

  async function marcarComoProbada() {
    if (!user || marcada) return;

    setLoading(true);

    const { error } = await supabase.from("hamburguesas_probadas").insert({
      usuario_id: user.id,
      hamburguesa_id: burgerId,
      puntuacion: null,
    });

    setLoading(false);

    if (!error) {
      alert("🍔 Añadida correctamente como probada");
      setMarcada(true);
    } else {
      alert("❌ Error al guardar. Intenta de nuevo.");
    }
  }

  if (!burger) return <p className="p-4">Cargando...</p>;

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{burger.nombre}</h1>
      <img
        src={burger.imagen_url}
        alt={burger.nombre}
        className="rounded-xl mb-6"
      />
      <h2 className="text-xl text-gray-700 mb-2">{burger.restaurante}</h2>
      <p className="text-gray-800 mb-4">{burger.descripcion}</p>

      {alergenos.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-600 mb-2">Contiene:</h3>
          <ul className="flex flex-wrap gap-2">
            {alergenos.map((item) => (
              <li
                key={item.alergenos.nombre}
                className="bg-yellow-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {item.alergenos.icono_url && (
                  <img src={item.alergenos.icono_url} className="w-4 h-4" />
                )}
                {item.alergenos.nombre}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        {user && (
          <button
            onClick={marcarComoProbada}
            disabled={marcada || loading}
            className={`px-4 py-2 rounded-lg text-white ${
              marcada ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {marcada ? "Ya marcada como probada ✅" : "Marcar como probada 🍔"}
          </button>
        )}

        {/* ✅ Aquí metemos el StarRating PRO, editable solo si marcada */}
        {marcada && (
          <StarRating
            burgerId={burgerId}
            usuarioId={user?.id}
            initialRating={puntuacion}
            onRated={(newRating) => setPuntuacion(newRating)}
          />
        )}
      </div>
    </main>
  );
}
