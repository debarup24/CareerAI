import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-page flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin" size={32} />
        <p className="text-white/40 text-sm tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
