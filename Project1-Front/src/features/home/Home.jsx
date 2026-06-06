import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Play,
  Store,
  Flame,
  ShoppingCart,
  Bookmark,
  BadgeCheck,
  Pizza,
  Beef,
  Coffee,
  IceCream,
  User,
  LogOut,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { removeUser } from "../../reducers/userSlice";
import {toast} from 'react-toastify'

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [partners, setPartners] = useState([]);
  const [foods, setFoods] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  let dispatch=useDispatch()

  useEffect(() => {
    const getAll = async () => {
      const res = await axiosInstance.get("/api/foodPartner/all");
      setPartners(res.data.data);
    };
    getAll();
  }, []);

  useEffect(() => {
    const getAll = async () => {
      const res = await axiosInstance.get("/api/food/all");
      setFoods(res.data.data);
    };
    getAll();
  }, []);

  const categories = [
    { name: "Paneer", icon: Pizza },
    { name: "Burger", icon: Beef },
    { name: "Cafe", icon: Coffee },
    { name: "Dessert", icon: IceCream },
    { name: "Drinks", icon: Coffee },
    { name: "Fast Food", icon: Beef },
  ];

  const handleLogout = async () => {
     try {
       const res = await axiosInstance.get("/api/auth/logout");
       dispatch(removeUser());
       toast.success(res.data.message);
       window.location.href='/login'
     } catch (error) {
       toast.error("Logout failed");
     }
   };

  if (foods.length === 0 && partners.length === 0) {
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
    <div className="min-h-screen bg-[#090B12] text-white pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-white/3 text-xs text-[#8dbdff]">
              <Sparkles className="w-3.5 h-3.5" />
              Premium food experience
            </div>

            <p className="mt-5 text-[#8dbdff] text-sm sm:text-base">
              Welcome back {user?.firstname} 🖐️
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-white via-[#d9e8ff] to-[#74a9ff] bg-clip-text text-transparent">
                Amazing Food
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-lg leading-6">
              Explore trending food, featured restaurants, and popular dishes in one clean dark interface.
            </p>
          </div>

          <div className="relative">
          <button
  onClick={() => setShowProfileMenu(!showProfileMenu)}
  className="
    group
    w-12 h-12
    rounded-2xl
    border-2 border-[#4ea1ff]
    bg-[#101522]
    shadow-[0_0_20px_rgba(78,161,255,0.35)]
    hover:shadow-[0_0_30px_rgba(78,161,255,0.6)]
    hover:scale-105
    transition-all duration-300
    flex items-center justify-center
  "
>
  <User className="w-5 h-5 text-[#4ea1ff] group-hover:text-white transition-colors duration-300" />
</button>

            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-14 z-40 w-64 rounded-[24px] border border-white/10 bg-[#0d1220]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5">
                    <p className="text-sm font-semibold text-white">
                      {user?.firstname} {user?.lastname || ""}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/home/user/profile")
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-zinc-200 hover:bg-white/5 transition"
                  >
                    <span className="flex items-center gap-3">
                      <User className="w-4 h-4 text-[#8dbdff]" />
                      My Profile
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-zinc-200 hover:bg-white/5 transition"
                  >
                    <span className="flex items-center gap-3">
                      <LogOut className="w-4 h-4 text-[#8dbdff]" />
                      Logout
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#4ea1ff]/15 bg-[#101522]/90 backdrop-blur-xl overflow-hidden">
          <div className="p-[1px] bg-gradient-to-r from-[#4ea1ff]/25 via-[#7aa9ff]/25 to-[#4ea1ff]/25">
            <div className="rounded-[27px] bg-[#101522] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#8dbdff] text-xs">
                    <BadgeCheck className="w-4 h-4" />
                    Watch Food Reels
                  </div>
                  <h2 className="mt-2 text-lg sm:text-xl font-bold text-white">
                    Discover trending dishes around you
                  </h2>
                </div>

              <button
  onClick={() => navigate("/home/reels")}
  className="group w-12 h-12 rounded-2xl border border-[#1f2a3a] bg-[#0f1626]  hover:bg-[#111a2c] hover:shadow-[0_0_24px_rgba(78,161,255,0.25)] transition-all duration-300 flex items-center justify-center shrink-0"
>
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ea1ff] to-[#2f7cff] shadow-[0_0_18px_rgba(78,161,255,0.65)] flex items-center justify-center group-hover:shadow-[0_0_28px_rgba(78,161,255,0.85)] transition-all duration-300">
    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
  </div>
</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-7 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-white">Categories</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                 onClick={() => navigate(`/home/search?category=${encodeURIComponent(cat.name)}`)}
                key={cat.name}
                className="group min-w-fit px-4 py-2.5 rounded-2xl border border-white/8 bg-[#101522] hover:border-[#4ea1ff]/45 hover:bg-[#121a2b] hover:shadow-[0_0_18px_rgba(78,161,255,0.16)] transition-all duration-300 flex items-center gap-2"
              >
                <Icon className="w-4 h-4 text-[#8dbdff] group-hover:text-white transition-colors" />
                <span className="text-sm text-zinc-200 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8 px-4 sm:px-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 ">
          <Flame className="w-5 h-5 text-[#8dbdff]" />
          <h2 className="text-sm md:text-3xl lg:text-4xl font-bold">Delicious Foods</h2>
        </div>
         <button onClick={()=>navigate('/home/view/foods')} className="group flex items-center gap-1 lg:px-3 md:px-3  px-1 py-1.5 rounded-xl border border-[#4ea1ff]/30 bg-[#101522] hover:border-[#4ea1ff] hover:bg-[#121a2b] hover:shadow-[0_0_15px_rgba(78,161,255,0.25)] transition-all duration-300">
    <span  className="text-sm  font-medium text-[#8dbdff] group-hover:text-white transition-colors">
      View All
    </span>
    <ChevronRight className="w-4 h-4 text-[#8dbdff] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
  </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {foods.slice(0,4).map((food) => (
            <div
              key={food._id}
              className="group rounded-[26px] border border-white/8 bg-[#101522] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300"
            >
              <div className="relative h-56">
                <video
                  src={food.video}
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B12] via-[#090B12]/20 to-transparent" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] text-white/90">
                  {food.category}
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] text-white/90">
                  ❤️ {food.likes?.length || 0}
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

                <button
                  onClick={() => navigate(`/home/food/detail/${food._id}`)}
                  className="group mt-4 w-full py-3 rounded-2xl border border-[#4ea1ff]/20 bg-transparent text-sm font-medium text-[#dcecff] hover:bg-[#121a2b] hover:border-[#4ea1ff]/55 hover:shadow-[0_0_18px_rgba(78,161,255,0.18)] transition-all duration-300"
                >
                  View Food
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 px-4 sm:px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#8dbdff]" />
            <h2 className="text-sm md:text-3xl lg:text-4xl font-bold">Trending Partners</h2>
          </div>
           <button onClick={()=>navigate('/home/view/partners')} className="group flex items-center gap-1 md:px-3 lg:px-3 px-1 py-1.5 rounded-xl border border-[#4ea1ff]/30 bg-[#101522] hover:border-[#4ea1ff] hover:bg-[#121a2b] hover:shadow-[0_0_15px_rgba(78,161,255,0.25)] transition-all duration-300">
    <span className="text-sm font-medium text-[#8dbdff] group-hover:text-white transition-colors">
      View All
    </span>
    <ChevronRight className="w-4 h-4 text-[#8dbdff] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
  </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {partners.slice(0,4).map((partner) => (
                 <div
              key={partner._id}
              className="group rounded-[28px] border border-white/8 bg-[#101522] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300"
            >
              <div className="p-5 flex items-center gap-4 border-b border-white/8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#4ea1ff]/20 bg-[#0d1220] flex items-center justify-center shrink-0">
                  {partner.profile ? (
                    <img
                      src={partner.profile}
                      alt={partner.businessname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-[#8dbdff]" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">
                    {partner.businessname}
                  </h3>
                  <p className="text-sm text-zinc-400 truncate">
                    {partner.contactname}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 text-[#8dbdff] shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Email</p>
                    <p className="text-sm text-white break-all">
                      {partner.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 text-[#8dbdff] shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Contact</p>
                    <p className="text-sm text-white">{partner.contact}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-[#8dbdff] shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Address</p>
                    <p className="text-sm text-white">{partner.address}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-[#4ea1ff]/10 text-[#8dbdff] text-xs">
                    Verified Partner
                  </span>

                  <button
                    onClick={() => navigate(`/home/profile/${partner._id}`)}
                    className="px-4 py-2 rounded-2xl border border-[#4ea1ff]/20 bg-transparent text-[#dcecff] text-sm font-medium hover:bg-[#121a2b] hover:border-[#4ea1ff]/50 transition-all duration-300"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;