import { Bookmark, Play, Search as SearchIcon, ShoppingCart, Store } from "lucide-react";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const NavPage = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  const activeClass = "text-[#8dbdff]";
  const inactiveClass = "text-zinc-500 hover:text-[#8dbdff]";

  return (
    <div className="min-h-screen bg-[#090B12] text-white pb-24 relative overflow-hidden">
      <Outlet />

      <div className="fixed bottom-0 left-0 right-0 z-50 h-18 sm:h-20 bg-[#0d1220]/95 backdrop-blur-2xl border-t border-white/8 flex justify-around items-center px-2">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center transition min-w-0 ${isActive("/home") ? activeClass : inactiveClass}`}
        >
          <Store size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </button>

        <button
          onClick={() => navigate("/home/search")}
          className={`flex flex-col items-center transition min-w-0 ${isActive("/home/search") ? activeClass : inactiveClass}`}
        >
          <SearchIcon size={20} />
          <span className="text-[10px] mt-1">Search</span>
        </button>

        <button
          onClick={() => navigate("/home/reels")}
          className={`group hidden md:flex lg:flex absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-16 sm:h-16 rounded-full border  items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,161,255,0.25)] hover:scale-110 ${
            isActive("/home/reels")
              ? "border-[#4ea1ff] bg-[#111a2c] shadow-[0_0_24px_rgba(78,161,255,0.25)]"
              : "border-[#1f2a3a] bg-[#0f1626]"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-[#4ea1ff] shadow-[0_0_28px_rgba(78,161,255,0.7)] flex items-center justify-center group-hover:shadow-[0_0_38px_rgba(78,161,255,0.9)] transition-all duration-300">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </button>

        <button
          onClick={() => navigate("/home/collection")}
          className={`flex flex-col items-center transition min-w-0 ${isActive("/home/collection") ? activeClass : inactiveClass}`}
        >
          <Bookmark size={20} />
          <span className="text-[10px] mt-1">Saved</span>
        </button>

        <button
          onClick={() => navigate("/home/cart")}
          className={`flex flex-col items-center transition min-w-0 ${isActive("/home/cart") ? activeClass : inactiveClass}`}
        >
          <ShoppingCart size={20} />
          <span className="text-[10px] mt-1">Cart</span>
        </button>
      </div>
    </div>
  );
};

export default NavPage;