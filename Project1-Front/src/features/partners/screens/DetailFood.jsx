import React from "react";
import {
  Pencil,
  Save,
  X,
  Calendar,
  Video,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { useRef } from "react";
import {toast} from 'react-toastify'

const DetailFood = () => {
  const { id } = useParams();
  let [isLoading,setIsLoading]=useState(false)
  const [edit, setEdit] = useState(false);
  const [food, setFood] = useState(null);
  let navigate=useNavigate()
  
  useEffect(() => {
    const getfooddetail = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/food/getsinglefood/${id}`
        );

        setFood(res.data.data);
      } catch (error) {
         
      }
    };

    getfooddetail();
  }, [id]);

  if (!food) {
     return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
      <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />

      <div className="relative w-20 h-20 rounded-full border-4 border-white/10 border-t-[#4ea1ff] border-r-[#4ea1ff] animate-spin shadow-[0_0_24px_rgba(78,161,255,0.22)]" />
    </div>
  );
  }

  const handleEdit=async()=>{
   try{
     setIsLoading(true)
     let res=await axiosInstance.post(`/api/food/editsinglefood/${id}`,{
      name:food.name,
      description:food.description,
      category:food.category
     })
     toast.success(res.data.message)
     setIsLoading(false)
   }
   finally{
    setIsLoading(false)
   }
  }

  return (
    <div className="h-screen bg-zinc-950 text-white p-4 overflow-hidden">
      <div className="h-full max-w-[1800px] mx-auto flex flex-col">

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between mb-4 px-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {food.name}
            </h1>

            <p className="text-zinc-500 mt-1">
              Manage food reel details and information
            </p>
          </div>
           {edit ?(
                  <div className="flex gap-2">

                  <button
  onClick={handleEdit}
  disabled={isLoading}
  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
    isLoading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700 cursor-pointer"
  }`}
>
  <Save size={16} />
  {isLoading ? "Saving..." : "Save"}
</button>

                    <button
                      onClick={() => setEdit(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                    >
                      <X size={16} />
                      Cancel
                    </button>

                  </div>
                ):  <button
              onClick={() => setEdit(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all duration-300"
            >
              <Pencil size={18} />
              Edit Food
            </button>}
        </div>

        {/* Main Layout */}
        <div className="flex-1 min-h-0 grid grid-cols-[1.4fr_.6fr] gap-5">

          {/* Video Section */}
          <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">

            <div className="h-full flex flex-col">

              {/* Video Header */}
              <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Video size={20} />
                  Food Reel Preview
                </h2>

                <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400">
                  Reel
                </span>
              </div>

              {/* Reel Preview */}
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">

  <video
    controls
    autoPlay
    muted
    playsInline
    className="max-h-[75vh] w-auto rounded-2xl"
    src={food.video}
  />

</div>

            </div>
          </div>

          {/* Details Section */}
          <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">

            <div className="h-full flex flex-col">

              {/* Top Bar */}
              <div className="shrink-0 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-semibold">
                    Food Information
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    Update food details
                  </p>
                </div>

               

              </div>

              {/* Form Area */}
              <div className="flex-1 overflow-y-auto p-6">

                <form className="space-y-6">

                  {/* Food Name */}
                  <div>
                    <label className="block mb-2 text-sm text-zinc-400">
                      Food Name
                    </label>

                    <input onChange={(e)=>setFood({...food,name:e.target.value})}
                      disabled={!edit}
                      value={food.name}
                      type="text"
                      className={`w-full h-14 rounded-xl px-4 border outline-none transition ${
                        edit
                          ? "bg-zinc-800 border-zinc-700 focus:border-orange-500"
                          : "bg-zinc-800/60 border-zinc-800 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-zinc-400">
                      Food Category
                    </label>

                    <input onChange={(e)=>setFood({...food,category:e.target.value})}
                      disabled={!edit}
                      value={food.category}
                      type="text"
                      className={`w-full h-14 rounded-xl px-4 border outline-none transition ${
                        edit
                          ? "bg-zinc-800 border-zinc-700 focus:border-orange-500"
                          : "bg-zinc-800/60 border-zinc-800 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-2 text-sm text-zinc-400">
                      Description
                    </label>

                    <textarea onChange={(e)=>setFood({...food,description:e.target.value})}
                      disabled={!edit}
                      value={food.description || ""}
                      rows={6}
                      className={`w-full rounded-xl p-4 border resize-none outline-none transition ${
                        edit
                          ? "bg-zinc-800 border-zinc-700 focus:border-orange-500"
                          : "bg-zinc-800/60 border-zinc-800 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  {/* Created / Updated */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                        <Calendar size={16} />
                        Created At
                      </div>

                      <p className="font-medium text-lg">
                        {food.createdAt?.slice(0, 10)}
                      </p>
                    </div>

                    <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                        <Calendar size={16} />
                        Updated At
                      </div>

                      <p className="font-medium text-lg">
                        {food.updatedAt?.slice(0, 10)}
                      </p>
                    </div>

                  </div>

                 

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailFood;