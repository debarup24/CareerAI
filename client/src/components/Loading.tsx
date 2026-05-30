import { Loader } from "lucide-react";
import TimeProgressBar from "./TimeProgressBar";

export default function FirstLoading() {
  return (
    <div className="bg-page flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin" size={32} />
        <TimeProgressBar />
      </div>
    </div>
  );
}
