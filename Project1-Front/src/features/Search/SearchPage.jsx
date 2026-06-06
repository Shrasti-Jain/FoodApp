import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Search as SearchIcon,
  Filter,
  Sparkles,
  SlidersHorizontal,
  Pizza,
  Beef,
  Coffee,
  IceCream,
  Flame,
  Store,
  Heart,
  Clock3,
  Star,
  ArrowRight,
  Play,
  Bookmark,
  ShoppingCart,
  ChevronDown,
  BadgeCheck,
  MapPin,
  UtensilsCrossed,
  Building2,
  DatabaseBackup,
  Mail,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";


const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [activeTab, setActiveTab] = useState("food");
  const [sortBy, setSortBy] = useState("low-high");
  const [foods,setFoods]=useState([])
  const[partners,setPartners]=useState([])
  let [data,setData]=useState("")
  let [call,setCall]=useState(false)
  let [show,setshow]=useState(partners)
  let [foodShow,setFoodshow]=useState(foods)
  let [filter,setFilter]=useState("")
      
   let handleSearch=(e)=>{
    setData(e.target.value);
   }
   useEffect(() => {
  if (category) {
    setData(category);
  }
}, [category]);
   useEffect(()=>{
      if(activeTab=="partner"){
          if(data!="") setshow(partners.filter((e)=>e.businessname.toLowerCase().includes(data.toLowerCase())||e.contactname.toLowerCase().includes(data.toLowerCase())))
          else setshow(partners)
      }
      else{
         let updated=foods
         if(data=="") updated=(foods)
         if(data!="" || filter=="") updated=(foods.filter((e)=>e.name.toLowerCase().includes(data.toLowerCase())))
         if(filter=="lh"){
             updated = [...updated].sort(
           (a, b) => a.price - b.price
        )
     }
      if(filter=="hl")
         updated = [...updated].sort(
           (a, b) => b.price - a.price
        );
     setFoodshow(updated)
    }
   },[data,filter,category])
 
     
    useEffect(() => {
       let getPartners = async () => {
         let res = await axiosInstance.get("/api/foodPartner/all");
         
         setPartners(res.data.data);
         setshow(res.data.data)
       };
       getPartners();

     }, []);
     


  if (partners.length==0 || foods.length==0) {
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
    <div className="min-h-screen bg-[#090B12] text-white relative overflow-hidden pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>


      <div className="relative z-10 px-4 sm:px-6 pt-6 sm:pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-[#4ea1ff]/10 text-xs text-[#8dbdff]">
              <Sparkles className="w-3.5 h-3.5" />
              Smart food search
            </div>


            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Search
              <span className="block bg-gradient-to-r from-white via-[#d9e8ff] to-[#74a9ff] bg-clip-text text-transparent">
                Food & Partners
              </span>
            </h1>


            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-lg leading-6">
              Find food items and partner profiles using different search modes, filters, and price sorting.
            </p>
          </div>


          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="rounded-[22px] border border-white/8 bg-[#101522] p-4 min-w-[96px]">
              <p className="text-zinc-500 text-xs">Foods</p>
              <p className="text-white text-xl font-bold mt-1">{foods.length}</p>
            </div>
            <div className="rounded-[22px] border border-white/8 bg-[#101522] p-4 min-w-[96px]">
              <p className="text-zinc-500 text-xs">Partners</p>
              <p className="text-white text-xl font-bold mt-1">{partners.length}</p>
            </div>
            <div className="rounded-[22px] border border-white/8 bg-[#101522] p-4 min-w-[96px]">
              <p className="text-zinc-500 text-xs">Trending</p>
              <p className="text-white text-xl font-bold mt-1">50</p>
            </div>
          </div>
        </div>


        <div className="mt-7 rounded-[30px] border border-[#4ea1ff]/15 bg-[#101522]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTab("food")}
                className={`h-14 rounded-2xl border flex items-center justify-center gap-2 font-semibold transition ${
                  activeTab === "food"
                    ? "bg-[#388eef] border-[#4ea1ff] text-white shadow-[0_0_18px_rgba(78,161,255,0.18)]"
                    : "bg-[#0d1220] border-white/8 text-zinc-300 hover:bg-[#121a2b]"
                }`}
              >
                <UtensilsCrossed size={18} />
                Food Search
              </button>


              <button
                onClick={() => setActiveTab("partner")}
                className={`h-14 rounded-2xl border flex items-center justify-center gap-2 font-semibold transition ${
                  activeTab === "partner"
                    ? "bg-[#388eef] border-[#4ea1ff] text-white shadow-[0_0_18px_rgba(78,161,255,0.18)]"
                    : "bg-[#0d1220] border-white/8 text-zinc-300 hover:bg-[#121a2b]"
                }`}
              >
                <Building2 size={18} />
                Partner Search
              </button>
            </div>


            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_180px_180px] gap-3">
              <div className="relative">
                <SearchIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#388eef]"
                  size={20}
                />
                <input onChange={handleSearch}
                  type="text"
                  placeholder={
                    activeTab === "food"
                      ? "Search for food items..."
                      : "Search for partners..."
                  }
                  className="w-full h-14 bg-[#0d1220] border border-white/8 rounded-2xl pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-[#4ea1ff] transition"
                />
              </div>


            {
                activeTab=="food"?<div className="relative mt-3 lg:mt-0">
                <select onChange={(e)=>setFilter(e.target.value)}
                  className="w-full h-14 appearance-none rounded-2xl border border-white/8 bg-[#0d1220] px-4 pr-10 text-zinc-200 outline-none focus:border-[#4ea1ff] transition"
                > 
                  <option default value="">Filter</option>
                  <option value="lh">Price: Low to High</option>
                  <option value="hl">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8dbdff]" size={18} />
              </div>:null
            }
            </div>
          </div>
        </div>


        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#8dbdff]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {activeTab === "food" ? "Food Results" : "Partner Results"}
            </h2>
          </div>
        </div>


        {
          foodShow.length!=0 || show.length!=0?<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {activeTab=="food" ?foodShow.map((item) => (
            <div
              key={item._id}
              className="group rounded-[26px] border border-white/8 bg-[#101522] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300"
            >
              <div className="relative h-56">
                <video
                  src={item.video}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B12] via-[#090B12]/20 to-transparent" />


                <div className="absolute top-3 right-3 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] text-white/90 flex items-center gap-1">
                  <Heart size={12} className="text-[#ff6b8b]" />
                  {item.likes.length}
                </div>


                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full border border-[#4ea1ff]/25 bg-[#0f1626]/90 backdrop-blur-md text-sm font-semibold text-[#8dbdff]">
                  ₹{item.price}
                </div>
              </div>


              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-white line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[#8dbdff] text-sm shrink-0">
                    <Star size={14} className="fill-[#8dbdff]" />
                    {item.rating}
                  </div>
                </div>


                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <Clock3 size={14} />
                  <span>Recently active</span>
                </div>


                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-[#4ea1ff]/10 text-[#8dbdff] text-xs">
                    {item.category}
                  </span>


                  <button  onClick={() => navigate(`/home/food/detail/${item._id}`)} className="px-4 py-2 rounded-2xl border border-[#4ea1ff]/20 bg-transparent text-[#dcecff] text-sm font-medium hover:bg-[#121a2b] hover:border-[#4ea1ff]/50 transition-all duration-300">
                    Open
                  </button>
                </div>
              </div>
            </div>
          )):
          show.map((partner) => (
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
        </div>:<h1 className="text-white text-xl">No Results found</h1> 
        }
      </div>
    </div>
  );
};


export default SearchPage;