import React, { useState } from "react";
import {
  Search,
  Heart,
  Star,
  ShoppingCart,
  MapPin,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { setUser } from "../../reducers/userSlice";
import { toast } from "react-toastify";

const CollectionPage = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.user);

  let handleRemove = async (id) => {
    let res = await axiosInstance.get(`/api/user/removeCollection/${id}`);
    dispatch(setUser(res.data.data));
    toast.success(res.data.message);
  };

  return (
    <div className="min-h-screen bg-[#090B12] text-white relative overflow-hidden pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative sticky top-0 z-50 backdrop-blur-2xl bg-[#0d1220]/95 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <h1 className="text-4xl font-black text-white">
            Food <span className="text-[#8dbdff]">Collection</span>
          </h1>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-[32px] border border-[#4ea1ff]/15 bg-[#101522] overflow-hidden shadow-[0_0_22px_rgba(78,161,255,0.08)] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">
              Discover Amazing Food 🍕
            </h2>
            <p className="text-zinc-400 text-lg">
              Explore dishes from trusted food partners near you.
            </p>
          </div>

          <button
            onClick={() => navigate("/home/cart")}
            className="px-8 py-4 rounded-2xl border border-[#4ea1ff]/20 bg-[#0f1626] text-[#dcecff] font-semibold hover:border-[#4ea1ff]/50 hover:bg-[#121a2b] hover:shadow-[0_0_25px_rgba(78,161,255,0.2)] transition-all duration-300"
          >
            Order Now
          </button>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { title: "Foods", value: "250+" },
          { title: "Partners", value: "40+" },
          { title: "Orders", value: "12K+" },
          { title: "Ratings", value: "4.9★" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-white/8 bg-[#101522] p-6 text-center shadow-[0_0_22px_rgba(78,161,255,0.06)]"
          >
            <h3 className="text-3xl font-black text-[#8dbdff]">
              {item.value}
            </h3>
            <p className="text-zinc-400">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-3xl font-black mb-8 text-white">Popular Foods</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {user?.collection?.map((food) => (
            <div
              key={food._id}
              className="group rounded-[28px] border border-white/8 bg-[#101522] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <video
                  src={food.video}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
                <button
                  onClick={() => handleRemove(food._id)}
                  className="absolute top-4 right-4 bg-red-500/90 hover:bg-red-500 p-2 rounded-full transition z-10"
                >
                  <Trash2 size={18} />
                </button>

                <div className="absolute bottom-4 left-4 bg-[#4ea1ff]/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-md">
                  ₹{food.price}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{food.name}</h3>

                <p className="text-zinc-400 text-sm mt-3 line-clamp-2">
                  {food.description}
                </p>

                <span className="inline-block bg-[#4ea1ff]/10 text-[#8dbdff] border border-[#4ea1ff]/20 px-3 py-1 rounded-full text-xs mt-4">
                  {food.category}
                </span>

                <div className="flex items-center gap-3 border-t border-white/8 pt-4 mt-4">
                  <img
                    src={food.foodPartner?.profile}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-[#4ea1ff]/30"
                  />

                  <div>
                    <p className="font-medium text-white">
                      {food.foodPartner?.businessname}
                    </p>

                    <p className="text-zinc-500 text-xs">
                      {food.foodPartner?.address}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/home/food/detail/${food._id}`)}
                  className="w-full mt-5 rounded-2xl border border-[#4ea1ff]/20 bg-transparent text-[#dcecff] font-bold py-3 hover:bg-[#121a2b] hover:border-[#4ea1ff]/50 hover:shadow-[0_0_20px_rgba(78,161,255,0.15)] transition-all duration-300"
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

export default CollectionPage;