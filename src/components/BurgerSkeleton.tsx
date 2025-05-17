export default function BurgerSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-white shadow flex flex-col">
      <div className="bg-black h-14" />
      <div className="h-64 bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-1/2 mt-2" />
      </div>
    </div>
  );
}
