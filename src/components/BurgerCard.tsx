import type { FC } from "react";

type Props = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  restaurante: string;
  logo_url?: string;
  isProbada?: boolean;
  alergenos?: { nombre: string; icono_url: string }[];
};

const BurgerCard: FC<Props> = ({
  id,
  nombre,
  descripcion,
  imagen_url,
  restaurante,
  logo_url,
  isProbada,
  alergenos = [],
}) => {
  return (
    <a href={`/burgers/${id}`} className="block h-full">
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-transform duration-300 flex flex-col h-full">
      {logo_url && (
        <div className="bg-black flex justify-center items-center p-3">
          <img
            src={logo_url}
            alt={`Logo de ${restaurante}`}
            className="h-14 object-contain"
          />
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={imagen_url}
          alt={nombre}
          className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300"></div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between min-h-[220px] relative">
        {isProbada && (
          <span className="absolute top-0 right-0 -translate-y-1/2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full shadow z-10">
            ⭐ Probada
          </span>
        )}

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{nombre}</h3>
          <p className="text-sm text-gray-700 line-clamp-4">{descripcion}</p>
        </div>

        <p className="text-xs text-gray-500 mt-3">🍴 {restaurante}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {alergenos.map((alerg) => (
            <div key={alerg.nombre} className="relative group/alerg">
              <img
                src={alerg.icono_url}
                alt={alerg.nombre}
                className="w-6 h-6 object-contain cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:brightness-110"
              />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded shadow-sm opacity-0 group-hover/alerg:opacity-100 pointer-events-none transition">
                {alerg.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </a>
  );
};

export default BurgerCard;
