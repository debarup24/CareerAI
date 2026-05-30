import { useEffect, useRef, useState } from "react";
import { useAppData } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { Crown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuth, user } = useAppData();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isPro = user?.subscription && new Date() < new Date(user.subscription);
  const freeLeft = Math.max(0, 5 - (user?.freeRequestsUsed ?? 0));

  // clicks outside event
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/6 bg-[#080b14]/80 backdrop-blur-xl">
      <Link to={"/"} className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-600 to-emerald-600 flex caret-yellow-200 justify-center shadow-lg shadow-indigo-500/30 text-2xl">
          💡
        </div>
        <span
          className="font-bold text-lg tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Career<span className="text-gradient">AI</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
        <Link
          to={"/analyse"}
          className={`transition-colors hover:text-white ${
            location.pathname === "/analyse" ? "text-indigo-500" : ""
          }`}
        >
          Analyse
        </Link>
        <Link
          to={"/jobmatcher"}
          className={`transition-colors hover:text-white ${
            location.pathname === "/jobmatcher" ? "text-indigo-500" : ""
          }`}
        >
          JobMatcher
        </Link>
        <Link
          to={"/resumebuilder"}
          className={`transition-colors hover:text-white ${
            location.pathname === "/resumebuilder" ? "text-indigo-500" : ""
          }`}
        >
          ResumeBuilder
        </Link>
        <Link
          to={"/interviewprep"}
          className={`transition-colors hover:text-white ${
            location.pathname === "/interviewprep" ? "text-indigo-500" : ""
          }`}
        >
          InterviewPrep
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {isAuth ? (
          <>
            {!isPro && (
              <div className="shadow-md shadow-emerald-700 bg-blue-950 rounded-2xl px-3 py-0.5 text-white/70">
                🪙 {freeLeft}{" "}
              </div>
            )}

            <Link
              to={"/account"}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/user.png"
                alt="user"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
              />
              <div className="flex gap-1">
                <span className="text-sm text-white/70">
                  {user?.name?.split(" ")[0]}{" "}
                </span>
                {isPro && <Crown className="text-green-300 size-4" />}
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="text-sm bg-blue-950 rounded-lg text-white/70 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              to={"/login"}
              className="btn-primary text-sm px-5 py-2 rounded-lg"
            >
              Get Started Free
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <button
        className="md:hidden bg-blue-950 p-1.5 rounded-lg text-white/60 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute top-full inset-x-0 bg-[#080b14]/95 backdrop-blur-xl border-b border-white/6 flex flex-col gap-4 px-6 py-6 md:hidden"
        >
          <Link
            to={"/analyse"}
            className=" hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            Analyse
          </Link>
          <Link
            to={"/jobmatcher"}
            className="hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            JobMatcher
          </Link>
          <Link
            to={"/resumebuilder"}
            className="hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            ResumeBuilder
          </Link>
          <Link
            to={"/interviewprep"}
            className="hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            InterviewPrep
          </Link>

          {isAuth ? (
            <>
              {!isPro && (
                <p className="text-xs text-white/60">
                  🪙 {freeLeft} Requests Remaining{" "}
                </p>
              )}

              <Link
                to={"/account"}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                onClick={() => setOpen(false)}
              >
                <img
                  src="/user.png"
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                />
                <div className="flex gap-1">
                  <span className="text-sm text-white/70">
                    {user?.name?.split(" ")[0]}
                  </span>
                  {isPro && <Crown className="text-green-300 size-3" />}
                </div>
              </Link>
            </>
          ) : (
            <>
              <p className="text-xs text-white/60">
                🪙 Sign up & Get 5 FREE Coins
              </p>
              <Link
                to={"/login"}
                className="text-sm bg-blue-950 rounded-lg text-white/70 hover:text-white transition-colors px-4 py-2"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to={"/login"}
                className="btn-primary text-sm px-5 py-2 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
