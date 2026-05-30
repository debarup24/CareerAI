import { useEffect, useState } from "react";

export default function TimeProgressBar() {
  const TOTAL_TIME = 40;

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= TOTAL_TIME) {
          clearInterval(timer);
          return TOTAL_TIME;
        }

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPercentage = (seconds / TOTAL_TIME) * 100;

  return (
    <div className="flex flex-col">
      <div className="w-40 xl:w-68 max-w-xl mx-auto mt-6">
        {/* Track */}
        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
          {/* Progress */}
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-700 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Message */}
      <div className="w-45 xl:w-60 mx-auto">
        {seconds >= TOTAL_TIME / 2 - 2 && (
          <p className="mt-3 px-3 text-white/40 text-sm tracking-widest uppercase animate-pulse">
            Please Wait...
          </p>
        )}
        {seconds >= TOTAL_TIME - 16 && (
          <p className="mt-3 px-3 text-white/40 text-sm tracking-widest uppercase animate-pulse">
            Connecting the Server...Application Loading..
          </p>
        )}
        {seconds >= TOTAL_TIME - 10 && (
          <p className="mt-3 px-3 text-white/40 text-sm tracking-widest uppercase animate-pulse">
            Application Loading...
          </p>
        )}
        {seconds >= TOTAL_TIME && (
          <p className="mt-3 px-3 text-white/40 text-sm tracking-widest uppercase animate-pulse">
            Almost Done...
          </p>
        )}
      </div>
    </div>
  );
}
