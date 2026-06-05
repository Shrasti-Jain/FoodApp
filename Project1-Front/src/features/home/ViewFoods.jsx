import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Store,
  Flame,
  ChevronRight,
  Play,
  Heart,
  BadgeCheck,
  MapPin,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";

const ViewFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFoods = async () => {
      let res = await axiosInstance.get("/api/food/all");
      setFoods(res.data.data);
    };
    getFoods();
  }, []);
  
  if(foods.length==0){
     return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
      <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />

      <div className="relative w-20 h-20 rounded-full border-4 border-white/10 border-t-[#4ea1ff] border-r-[#4ea1ff] animate-spin shadow-[0_0_24px_rgba(78,161,255,0.22)]" />
    </div>
  );
  }
  return (
    <div className="min-h-screen bg-[#090B12] text-white relative overflow-hidden pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative sticky top-0 z-50 bg-[#0d1220]/95 backdrop-blur-2xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">
              View <span className="text-[#8dbdff]">All Foods</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Explore every food item in a premium dark interface.
            </p>
          </div>

          <button
            onClick={() => navigate("/home/search")}
            className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#4ea1ff]/20 bg-[#101522] text-[#dcecff] hover:border-[#4ea1ff]/50 hover:shadow-[0_0_18px_rgba(78,161,255,0.14)] transition-all duration-300"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="rounded-[32px] border border-[#4ea1ff]/15 bg-[#101522] overflow-hidden shadow-[0_0_22px_rgba(78,161,255,0.08)] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-white/3 text-xs text-[#8dbdff]">
              <BadgeCheck className="w-3.5 h-3.5" />
              Premium food discovery
            </div>

            <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-white via-[#dcecff] to-[#74a9ff] bg-clip-text text-transparent">
                Food Items
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-6">
              Browse all available food videos, prices, categories, and partner details in one clean view.
            </p>
          </div>

          <button
            onClick={() => navigate("/home/reels")}
            className="group w-14 h-14 rounded-2xl border border-[#1f2a3a] bg-[#0f1626] hover:bg-[#111a2c] hover:shadow-[0_0_24px_rgba(78,161,255,0.25)] transition-all duration-300 flex items-center justify-center shrink-0"
          >
            <div className="w-14 h-14 rounded-full bg-[#4ea1ff] shadow-[0_0_28px_rgba(78,161,255,0.7)] flex items-center justify-center group-hover:shadow-[0_0_38px_rgba(78,161,255,0.9)] transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </button>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#8dbdff]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              All Foods
            </h2>
          </div>

          <span className="px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-[#101522] text-[#8dbdff] text-sm">
            {foods.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 pb-10">
          {foods.map((food) => (
            <div
              key={food._id}
              className="group rounded-[28px] border border-white/8 bg-[#101522] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <video
                  src={food.video}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  muted
                  autoPlay
                  loop
                  playsInline
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090B12] via-[#090B12]/20 to-transparent" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] text-white/90">
                  {food.category}
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] text-white/90 flex items-center gap-1">
                  <Heart size={12} className="text-[#ff6b8b]" />
                  {food.likes?.length || 0}
                </div>

                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full border border-[#4ea1ff]/25 bg-[#0f1626]/90 backdrop-blur-md text-sm font-semibold text-[#8dbdff]">
                  ₹{food.price}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-white line-clamp-1">
                  {food.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                  {food.description}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#4ea1ff]/20 bg-[#0d1220] flex items-center justify-center">
                    {food.foodPartner?.profile ? (
                      <img
                        src={food.foodPartner.profile}
                        alt={food.foodPartner?.businessname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={18} className="text-[#8dbdff]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {food.foodPartner?.businessname}
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {food.foodPartner?.address}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/home/food/detail/${food._id}`)}
                  className="w-full mt-5 rounded-2xl border border-[#4ea1ff]/20 bg-transparent text-[#dcecff] font-semibold py-3 hover:bg-[#121a2b] hover:border-[#4ea1ff]/50 hover:shadow-[0_0_20px_rgba(78,161,255,0.15)] transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFoods;