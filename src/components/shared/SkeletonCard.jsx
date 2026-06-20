export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="h-56 bg-gray-200" />
      <div className="p-4">
        <div className="h-3 bg-gray-200 rounded mb-2" />
        <div className="h-2 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}