import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import BurgerCard from "./BurgerCard";
import { useUser } from "@clerk/clerk-react";
import { AnimatePresence, motion } from "framer-motion";
import BurgerSkeleton from "./BurgerSkeleton";

const BURGERS_PER_LOAD = 6;

export default function BurgersList() {
  const [allBurgers, setAllBurgers] = useState<any[]>([]);
  const [visibleBurgers, setVisibleBurgers] = useState<any[]>([]);
  const [probadasIds, setProbadasIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");
  const [showOnlyProbadas, setShowOnlyProbadas] = useState(false);
  const [showOnlyNoProbadas, setShowOnlyNoProbadas] = useState(false);
  const sentinelRef = useRef(null);

  // NUEVO: estado para alérgenos y seleccionados
  const [alergenos, setAlergenos] = useState<{ nombre: string; icono_url: string | null }[]>([]);
  const [selectedAlergenos, setSelectedAlergenos] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBurgers() {
      const { data } = await supabase
        .from("hamburguesas")
        .select("*, hamburguesa_alergenos(alergenos(nombre, icono_url))");

      setAllBurgers(data || []);
      setVisibleBurgers((data || []).slice(0, BURGERS_PER_LOAD));
      setLoading(false);

      // NUEVO: extraer alérgenos únicos y marcar todos seleccionados por defecto
      const allAlergenos = (data || [])
        .flatMap((burger) => burger.hamburguesa_alergenos || [])
        .map((a) => a.alergenos)
        .filter(
          (al, idx, arr) =>
            al?.nombre &&
            arr.findIndex((x) => x.nombre === al.nombre) === idx
        );

      setAlergenos(allAlergenos);
      setSelectedAlergenos(allAlergenos.map((a) => a.nombre));
    }

    fetchBurgers();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function fetchProbadas() {
      const { data } = await supabase
        .from("hamburguesas_probadas")
        .select("hamburguesa_id")
        .eq("usuario_id", user.id);

      setProbadasIds(data?.map((item) => item.hamburguesa_id) || []);
    }

    fetchProbadas();
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingMore &&
          visibleBurgers.length < allBurgers.length
        ) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleBurgers((prev) => {
              const next = allBurgers.slice(prev.length, prev.length + BURGERS_PER_LOAD);
              return [...prev, ...next];
            });
            setLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 1 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [allBurgers, loadingMore, visibleBurgers.length]);

  // FILTRADO CON ALERGENOS AÑADIDOS:
  const filteredBurgers = visibleBurgers.filter((burger) => {
    const matchesSearch = burger.nombre.toLowerCase().includes(searchText.toLowerCase());
    const isProbada = probadasIds.includes(burger.id);

    if (showOnlyProbadas && !isProbada) return false;
    if (showOnlyNoProbadas && isProbada) return false;

    // Alérgenos de la burger
    const alergenosBurger = (burger.hamburguesa_alergenos || []).map(
      (a) => a.alergenos.nombre
    );

    // Lista de alérgenos desmarcados
    const alergenosNoSeleccionados = alergenos
      .map((a) => a.nombre)
      .filter((a) => !selectedAlergenos.includes(a));

    // Si la burger contiene alguno de los alérgenos desmarcados, ocultarla
    const tieneAlergenoNoSeleccionado = alergenosBurger.some((al) =>
      alergenosNoSeleccionados.includes(al)
    );

    if (tieneAlergenoNoSeleccionado) return false;

    return matchesSearch;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-24">
      {/* Título */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-2">📜 La Carta</h1>
        <p className="mt-2 text-center text-lg text-gray-700">
          Explora todas las hamburguesas que compiten en The Champions Burger 2025.
          <br />
          Disfruta de una selección única con {allBurgers.length} participantes.
          <br />
          🍔 ¿Cuál será tu favorita hoy?
        </p>
      </div>

      {/* Buscador y filtros */}
      <div className="mt-6 mb-6 w-full px-4">
        <input
          type="text"
          placeholder="Buscar por nombre de burger..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {user && (
          <div className="flex items-center justify-center gap-6 mt-4 mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlyProbadas}
                onChange={() => {
                  setShowOnlyProbadas(!showOnlyProbadas);
                  setShowOnlyNoProbadas(false);
                }}
              />
              Mostrar solo probadas
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlyNoProbadas}
                onChange={() => {
                  setShowOnlyNoProbadas(!showOnlyNoProbadas);
                  setShowOnlyProbadas(false);
                }}
              />
              Mostrar solo no probadas
            </label>
          </div>
        )}

        {/* NUEVO: filtros de alérgenos */}
        
        <div className="relative w-full mt-8">
        <div className="flex justify-center flex-wrap gap-4">
          {alergenos.map((alerg) => {
            const isSelected = selectedAlergenos.includes(alerg.nombre);
            return (
              <label
                key={alerg.nombre}
                className={`flex items-center gap-2 cursor-pointer rounded-full px-5 py-2 text-xs shadow-sm select-none
                transition-transform duration-200 hover:scale-105
                ${isSelected ? "bg-purple-600 text-white" : "bg-yellow-100 text-purple-700"}
              `}

              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => {
                    setSelectedAlergenos((prev) =>
                      isSelected
                        ? prev.filter((a) => a !== alerg.nombre)
                        : [...prev, alerg.nombre]
                    );
                  }}
                />
                {alerg.icono_url && (
                  <img
                    src={alerg.icono_url}
                    alt={alerg.nombre}
                    className={`w-4 h-4 object-contain ${isSelected ? "filter brightness-200" : ""}`}
                  />
                )}
                <span>{alerg.nombre}</span>
              </label>
            );
          })}
        </div>

        {/* Icono de ayuda posicionado globalmente respecto al ancho completo */}
        <div className="absolute -top-6 right-6 group">
          <div className="w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center cursor-help">
            ?
          </div>
          <div className="absolute right-1/2 translate-x-1/2 bottom-6
 bg-black text-white text-[10px] px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
            Desmarca los alérgenos que no quieres ver
          </div>
        </div>
      </div>

      </div>

      {/* Burgers o mensajes */}
      {filteredBurgers.length === 0 ? (
        <AnimatePresence mode="wait">
          <motion.p
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 mt-10"
          >
            {searchText
              ? "No se encontró ninguna burger con ese nombre."
              : showOnlyProbadas
                ? "No has probado ninguna burger aún."
                : showOnlyNoProbadas
                  ? "¡Has probado todas las burgers!"
                  : "No hay burgers disponibles."}
          </motion.p>
        </AnimatePresence>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredBurgers.map((burger) => (
              <motion.div
                key={burger.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <BurgerCard
                  {...burger}
                  isProbada={probadasIds.includes(burger.id)}
                  alergenos={burger.hamburguesa_alergenos?.map((a) => a.alergenos) || []}
                />
              </motion.div>
            ))}

            {/* Skeletons al cargar más */}
            {loadingMore &&
              visibleBurgers.length < allBurgers.length &&
              Array.from({ length: 3 }).map((_, i) => <BurgerSkeleton key={`skeleton-${i}`} />)}
          </AnimatePresence>
        </div>
      )}

      {/* Sentinela para el IntersectionObserver */}
      <div ref={sentinelRef} className="h-12"></div>
    </div>
  );
}
