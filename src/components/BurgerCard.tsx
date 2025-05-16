type Props = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  restaurante: string;
  logo_url?: string;
  isProbada?: boolean;
};

export default function BurgerCard({ id, nombre, descripcion, imagen_url, restaurante,logo_url, isProbada }: Props) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-white flex flex-col relative">
      {logo_url && (
        <div className="bg-black flex justify-center items-center p-2">
          <img src={logo_url} alt={`Logo de ${restaurante}`} className="h-12 object-contain" />
        </div>
      )}

      {isProbada && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          ⭐ Probada
        </div>
      )}

      <img
        src={imagen_url}
        alt={nombre}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold">{nombre}</h3>
        <p className="text-sm text-gray-700 flex-1">{descripcion}</p>
        <p className="text-xs text-gray-500 mt-1">🍴 {restaurante}</p>

        <a
          href={`/burgers/${id}`}
          className="mt-4 inline-block bg-black text-white text-sm py-2 px-4 rounded hover:bg-gray-800 text-center"
        >
          Ver detalles
        </a>
      </div>
    </div>
  );
}
