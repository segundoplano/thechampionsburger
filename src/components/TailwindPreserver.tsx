export default function TailwindPreserver() {
  return (
    <div className="hidden">
      {/* Fuerza clases base usadas en React */}
      <div className="text-white text-black text-purple-600 text-gray-700 bg-white bg-black bg-opacity-50 shadow-md shadow-lg rounded-lg px-4 py-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" />
      <div className="text-3xl text-4xl text-6xl font-bold font-extrabold text-center" />
      <div className="hover:text-purple-600 hover:bg-purple-700 transition" />
    </div>
  );
}
