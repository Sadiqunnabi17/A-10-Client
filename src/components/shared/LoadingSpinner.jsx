export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-accent flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        <p className="text-primary font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}