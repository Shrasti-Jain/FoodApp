import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  UtensilsCrossed,
  FileText,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../../reducers/userSlice";

const VideoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [foodData, setFoodData] = useState(null);
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axiosInstance.get(`/api/food/getsinglefoood/${id}`);
        setFoodData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFood();
  }, [id]);

  let handleAddToCart = async (id) => {
    let res = await axiosInstance.get(`/api/user/addtocart/${id}`);
    toast.success(res.data.message);
    dispatch(setUser(res.data.data));
  };

  let handleRemove = async (id) => {
    let res = await axiosInstance.get(`/api/food/remove/${id}`);
    dispatch(setUser(res.data.data));
    toast.success(res.data.message);
  };

  if (!foodData) {
   return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
      <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />

      <div className="relative w-20 h-20 rounded-full border-4 border-white/10 border-t-[#4ea1ff] border-r-[#4ea1ff] animate-spin shadow-[0_0_24px_rgba(78,161,255,0.22)]" />
    </div>
  );
  }

  let isInCart = user.cartItems.find((e) => e.food._id == foodData._id);

  return (
    <div className="min-h-screen bg-[#090B12] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <header className="relative sticky top-0 z-50 border-b border-white/8 bg-[#0d1220]/95 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-white/10 bg-[#101522] hover:bg-[#121a2b] hover:border-[#4ea1ff]/40 transition-all duration-200"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl lg:text-2xl font-black text-white">
              Reel Details
            </h1>
            <p className="text-sm text-zinc-400">
              View food reel information
            </p>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1.8fr_0.9fr] gap-8">
          <section>
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-black text-white">
                {foodData.foodname}
              </h1>

              <div className="flex justify-between items-center gap-4 mt-3">
                <p className="text-zinc-400">
                  Delicious food reel from {foodData.foodPartner?.businessname}
                </p>

                {isInCart ? (
                  <button
                    onClick={() => handleRemove(foodData._id)}
                    className="px-4 py-3 rounded-2xl font-bold border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15 transition-all duration-300"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(foodData._id)}
                    className="px-4 py-3 rounded-2xl font-bold border border-[#4ea1ff]/20 bg-[#4ea1ff]/10 text-[#8dbdff] hover:bg-[#4ea1ff]/15 hover:border-[#4ea1ff]/40 transition-all duration-300"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[#101522] shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <video
                controls
                className="w-full h-[35vh] md:h-[55vh] lg:h-[80vh] object-contain bg-black"
              >
                <source src={foodData.video} type="video/mp4" />
              </video>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 h-fit space-y-5">
            <div className="bg-[#101522] border border-white/8 rounded-[28px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <p className="text-sm text-zinc-400 mb-2">Food Name</p>
              <h2 className="text-2xl font-bold text-white">
                {foodData.name}
              </h2>
            </div>

            <div className="bg-[#101522] border border-white/8 rounded-[28px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="flex items-center gap-4">
                <img
                  onClick={() => navigate(`/home/profile/${foodData.foodPartner._id}`)}
                  className="w-14 h-14 rounded-full object-cover cursor-pointer"
                  src={foodData.foodPartner.profile}
                  alt=""
                />
                <div>
                  <p className="text-sm text-zinc-400">
                    {foodData.foodPartner?.businessname}
                  </p>
                  <h3 className="font-semibold text-lg text-white">
                    {foodData.foodPartner?.address}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-[#101522] border border-white/8 rounded-[28px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <UtensilsCrossed className="text-[#8dbdff]" size={22} />
                <h3 className="font-semibold text-lg text-white">Category</h3>
              </div>

              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#4ea1ff]/10 text-[#8dbdff] border border-[#4ea1ff]/20 font-medium">
                {foodData.category}
              </span>
            </div>

            <div className="relative overflow-hidden bg-[#101522] border border-[#4ea1ff]/15 rounded-[28px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4ea1ff]/10 blur-3xl"></div>

              <p className="text-zinc-400 text-sm mb-2">Price</p>

              <div className="flex items-center gap-2">
                <span className="text-[#8dbdff] text-2xl font-bold">₹</span>
                <h2 className="text-4xl font-extrabold text-white">
                  {foodData.price}
                </h2>
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                Current selling price
              </p>
            </div>

            <div className="bg-[#101522] border border-white/8 rounded-[28px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-[#8dbdff]" size={22} />
                <h3 className="font-semibold text-lg text-white">
                  Description
                </h3>
              </div>

              <div className="border-t border-white/8 pt-4 max-h-52 overflow-y-auto pr-2">
                <p className="text-zinc-400 leading-7 text-sm">
                  {foodData.description || "No description available."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;