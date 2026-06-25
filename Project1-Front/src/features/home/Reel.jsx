import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../../reducers/userSlice";
import { User, LogOut, ChevronDown,Bookmark, Heart, ShoppingCart, ShoppingBag, Search, Home, Grid2X2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";

const Reel = () => {
  const videoRefs = useRef({});
  const [pausedVideo, setPausedVideo] = useState(null);
  const [all, setAll] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();
  const user = useSelector((state) => state.user.user);
  let snapshots=useRef(null)
  let saveSnapshot=useRef(null)

  useEffect(() => {
    const call = async () => {
      const res = await axiosInstance.get("/api/food/all");
      setAll(res.data.data);
    };
    call();
  }, []);

  async function handleLike(id){
      snapshots.current=structuredClone(all);
      setAll(prev=>
        prev.map(item=>{
          if(item._id!=id) return item;

          const liked=item.likes.includes(user._id);

          return {
            ...item,
            likes:liked?item.likes.filter((e)=>e!=user._id):[...item.likes,user._id]
          }
        })
      )
      try {
      const res = await axiosInstance.get(`/api/food/like-unlike/${id}`);
      console.log(res);
      } catch (error) {
        console.log(error);
        setAll(snapshots.current)
        toast.error("Failed to update your like")
      }
  }

  async function handleSave(id){
    saveSnapshot.current=structuredClone(user)
    const isSaved = user.collection.some(
  (q) => q._id== id
);
   dispatch(setUser({
      ...user,
      collection: isSaved
        ? user.collection.filter(
            (q) => q._id != id
          )
        : [...user.collection,id],
    })
      )
    try{
      let res=await axiosInstance.post('/api/user/collection',{foodId:id})
      toast.success(res.data.message)
    }
    catch(error){
      console.log(error);
       dispatch(setUser(saveSnapshot.current)) 
      toast.error("Failed to update your collection")
    }
  } 

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);
  

  const handleLogout = async () => {
  
      const res = await axiosInstance.get("/api/auth/logout");
      dispatch(removeUser());
      toast.success(res.data.message);
      window.location.href='/login'
    
  };
   
   useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // pause all videos first
          Object.values(videoRefs.current).forEach((v) => {
            if (v && v !== video) {
              v.pause();
            }
          });

          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.7, // 70% visible
    }
  );

  Object.values(videoRefs.current).forEach((video) => {
    if (video) observer.observe(video);
  });

  return () => observer.disconnect();
}, [all]);

  const navItems = [
    { label: "Home", icon: Home, path: "/home" },
    { label: "Search", icon: Search, path: "/home/search" },
    { label: "Cart", icon: ShoppingCart, path: "/home/cart" },
    { label: "Collection", icon: Grid2X2, path: "/home/collection" },
  ];

  if (all.length === 0) {
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
    <div className="bg-black h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {/* Desktop Sidebar Only */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 z-50 p-5">
        <div className="w-full h-full rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-[#4ea1ff]/15 border border-[#4ea1ff]/20 flex items-center justify-center">
                <ShoppingBag className="text-[#4ea1ff]" size={20} />
              </div>
              <div>
                <h1 className="text-white font-black text-xl leading-none">FoodReels</h1>
                <p className="text-white/40 text-xs mt-1">Explore delicious reels</p>
              </div>
            </div>

            <nav className="space-y-2">
  {navItems.map((item) => {
    const Icon = item.icon;
    const active = location.pathname === item.path;

    return (
      <button
        key={item.label}
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left ${
          active
            ? "bg-[#4ea1ff] text-white shadow-lg shadow-orange-500/20"
            : "text-white/70 hover:bg-white/8 hover:text-white"
        }`}
      >
        <Icon size={18} />

        <div className="flex items-center justify-between w-full">
          <span className="font-medium">{item.label}</span>

          {item.label === "Cart" &&
            user?.cartItems?.length > 0 && (
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-[#4ea1ff] animate-ping opacity-40"></span>

                <span className="relative min-w-[22px] h-[22px] px-1 rounded-full bg-gradient-to-r from-[#4ea1ff] to-[#3e8fec] text-white text-[11px] font-bold flex items-center justify-center">
                  {user.cartItems.length > 99
                    ? "99+"
                    : user.cartItems.length}
                </span>
              </div>
            )}
        </div>
      </button>
    );
  })}
</nav>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/home/user/profile")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Keep your current mobile navbar exactly as it was */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3">
          <div className="w-full max-w-[480px] px-5 py-3 rounded-2xl flex items-center justify-between">
            <h1 className="text-white text-xl font-black">FoodReels</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home/cart')}
                className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
              >
                <ShoppingCart size={19} />
                {user?.cartItems?.length ? (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-orange-500 text-[9px] font-bold flex items-center justify-center">
                    {user.cartItems.length}
                  </span>
                ) : null}
              </button>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30">
                    {user?.profile ? (
                      <img src={user.profile} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                        <User size={17} className="text-white/70" />
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-white transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <button
                      onClick={() => { navigate("/home/user/profile"); setOpen(false); }}
                      className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/5 text-sm"
                    >
                      <User size={16} className="text-[#4ea1ff]" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 text-sm"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reels */}
      <div className="flex justify-center md:pl-72">
        <div className="w-full max-w-[480px]">
          {all.map((item) => (
            <div key={item._id} className="h-screen snap-start relative overflow-hidden">
              <video
                ref={(el) => (videoRefs.current[item._id] = el)}
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={item.video}
                loop
                muted
                playsInline
                onClick={() => {
                  const video = videoRefs.current[item._id];
                  if (!video) return;
                  if (video.paused) {
                    video.play();
                    setPausedVideo(null);
                  } else {
                    video.pause();
                    setPausedVideo(item._id);
                  }
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute right-3 bottom-8 flex flex-col items-center gap-5 z-50">


  {/* Like */}
  <button className="flex flex-col items-center gap-1">
    <div
      onClick={()=>handleLike(item._id)}
      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center"
    >
      <Heart
        size={24}
        color={item.likes.includes(user._id) ? "red" : "white"}
        fill={item.likes.includes(user._id) ? "red" : "transparent"}
      />
    </div>

    <span className="text-white text-xs font-semibold">
      {item.likes.length}
    </span>
  </button>

  {/* Collection */}
  <button className="flex flex-col items-center gap-1">
    <div
      onClick={()=>handleSave(item._id)}
      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center"
    >
      <Bookmark size={22} className="text-white" />
    </div>

    <span className="text-white text-xs font-semibold">
      {
        user.collection.find((q)=>q._id==item._id)?"Saved":"Save"
      }
    </span>
  </button>

  {/* Cart */}
  <button className="flex flex-col items-center gap-1">
    <div
      onClick={async () => {
        const res = await axiosInstance.get(
          `/api/user/addtocart/${item._id}`
        );

        toast.success(res.data.message);
        dispatch(setUser(res.data.data));
      }}
      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center"
    >
      <ShoppingCart className="text-white" size={22} />
    </div>

    <span className="text-white text-xs font-semibold">
      {user.cartItems.find(
        (e) => e.food._id === item._id
      )
        ? "Added"
        : "Cart"}
    </span>
  </button>

  {/* Orders */}
  <button
    onClick={() => navigate("/home/cart")}
    className="flex flex-col items-center gap-1"
  >
    <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center">
      <ShoppingBag className="text-white" size={22} />
    </div>

    <span className="text-white text-xs font-semibold">
      Order
    </span>
  </button>
   
   <div
    onClick={() => navigate(`/home/profile/${item.foodPartner._id}`)}
    className="flex flex-col items-center cursor-pointer"
  >
    <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-700 shadow-lg">
      {item.foodPartner?.profile ? (
        <img
          src={item.foodPartner.profile}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <User size={22} className="text-white" />
        </div>
      )}
    </div>

    <span className="text-white text-[10px] mt-1 max-w-[60px] truncate">
      {item.foodPartner?.businessname}
    </span>
  </div>
</div>

              <div className="absolute   bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-20">
               <h2 className="text-white text-xl font-black mb-1">🍔 {item.name}  </h2>
                <p className="text-white/90 text-sm leading-relaxed mb-0">
                  {item?.description.slice(0,40) + (item.description.length>40?'...':'')  || "🔥 Freshly prepared with premium ingredients."}  <span
    onClick={() => navigate(`/home/food/detail/${item._id}`)}
    className="px-2 py-1 text-xs font-semibold rounded-full bg-[#4ea1ff]/90 text-white cursor-pointer hover:bg-[#3e8eea] transition-all duration-300"
  >
    View →</span>
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reel;