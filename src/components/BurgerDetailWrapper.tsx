import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useUser, SignedOut, SignedIn } from "@clerk/clerk-react";
import { useSignInModal } from "../hooks/useSignInModal";
import StarRating from "./StarRating";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";



type Props = {
  burgerId: string;
};

export default function BurgerDetailWrapper({ burgerId }: Props) {
  const [burger, setBurger] = useState<any>(null);
  const [alergenos, setAlergenos] = useState<any[]>([]);
  const { user } = useUser();
  const { open, SignInModal } = useSignInModal("/burger");
  const [marcada, setMarcada] = useState(false);
  const [puntuacion, setPuntuacion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mostrarEstrellas, setMostrarEstrellas] = useState(false);


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
        setMostrarEstrellas(true);
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
      setMarcada(true);
      setMostrarEstrellas(true);
    } else {
      console.error(error);
    }
  }
  async function handleUnmark() {
    if (!user || !marcada) return;

    const { error } = await supabase
      .from("hamburguesas_probadas")
      .delete()
      .eq("usuario_id", user.id)
      .eq("hamburguesa_id", burgerId);

    if (!error) {
      setMostrarEstrellas(false);
      setTimeout(() => {
        setMarcada(false);
        setPuntuacion(null);
      }, 300);
    } else {
      console.error(error);
    }
  }


  if (!burger) return <p className="p-4">Cargando...</p>;

  return (
    <main className="max-w-5xl mx-auto px-1 py-8 space-y-6">
      {/* Logo restaurante */}
      {burger.logo_url && (
        <div className="flex justify-center bg-black rounded-lg p-4 shadow-md mt-6 mb-6">
          <img
            src={burger.logo_url}
            alt={`Logo de ${burger.restaurante}`}
            className="h-16 object-contain"
          />
        </div>
      )}
      <div className="items-center justify-center h-20">
        <h1 className="text-4xl font-bold text-center">{burger.nombre}</h1>
      </div>
      {/* Contenido en 2 columnas */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda */}
        <div className="md:basis-1/2 space-y-4">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={burger.imagen_url}
              alt={burger.nombre}
              className="w-full h-auto object-cover"
            />

          </div>

        </div>

        {/* Columna derecha */}
        <div className="md:basis-1/2 space-y-5">
          <motion.div
            className="md:basis-1/2 space-y-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-gray-800 leading-relaxed">{burger.descripcion}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-600 mb-2">Contiene:</h3>
              <div className="flex flex-wrap gap-2">
                {alergenos.map((item) => (
                  <div
                    key={item.alergenos.nombre}
                    className="bg-yellow-100 px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm transition-transform duration-200 hover:scale-105 hover:brightness-110"
                  >
                    {item.alergenos.icono_url && (
                      <img
                        src={item.alergenos.icono_url}
                        alt={item.alergenos.nombre}
                        className="w-3.5 h-3.5 object-contain"
                      />
                    )}
                    {item.alergenos.nombre}
                  </div>
                ))}
              </div>
            </div>

            {/* Botón y puntuación */}
            <div className="pt-4">
              <SignedOut>
                <div className="p-5 border rounded-lg bg-yellow-50 text-center shadow-md space-y-4">
                  <p className="text-lg font-semibold">¿Has probado esta burger?</p>

                  <p className="flex justify-center items-center gap-1 text-sm text-gray-600">
                    <Lock className="w-4 h-4 text-gray-400" />
                    Inicia sesión para marcarla como probada y darle una puntuación
                  </p>

                  <button
                    onClick={open}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transform transition-transform duration-200 hover:scale-105 shadow-lg shadow-yellow-100/40"
                  >
                    Iniciar sesión ahora
                  </button>

                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Te llevará al login y volverás aquí automáticamente.
                </p>

              </SignedOut>


              <SignedIn>
                <AnimatePresence mode="wait">
                  {marcada ? (
                    <motion.div
                      key="desmarcar"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 flex-wrap"
                    >
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                        ✅ Ya probada
                      </span>

                      <button
                        title="Eliminar esta burger de tu lista de probadas"
                        onClick={handleUnmark}
                        className="ml-2 bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full hover:bg-red-200 transition-all"
                      >
                        Desmarcar
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="marcar"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onClick={marcarComoProbada}
                      disabled={loading}
                      className="w-full px-4 py-2 rounded-lg text-white text-center transition-all bg-green-600 hover:bg-green-700"
                    >
                      Marcar como probada 🍔
                    </motion.button>
                  )}
                </AnimatePresence>

              </SignedIn>
              <br></br>
              <br></br>
              <SignedIn>
                <AnimatePresence>
                  {mostrarEstrellas && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <StarRating
                        burgerId={burgerId}
                        usuarioId={user?.id}
                        initialRating={puntuacion}
                        onRated={(newRating) => setPuntuacion(newRating)}
                      />
                      {puntuacion === null && (
                        <p className="text-sm text-gray-400 mt-2">
                          ¿Quieres puntuarla? Solo tienes que hacer clic en las estrellas ⭐
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </SignedIn>
              <SignInModal />
            </div>
          </motion.div>
        </div>
      </div>
    </main>


  );
}
