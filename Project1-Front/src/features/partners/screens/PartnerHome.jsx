import React, { useRef, useState } from "react";
import {
  UploadCloud,
  RefreshCcw,
  Trash2,
  User,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removePartner } from "../../../reducers/partnerSlice";

const CreateFood = () => {
  let [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef({});
  const [preview, setPreview] = useState("");
  let { partner } = useSelector((state) => state.partner);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 30 * 1024 * 1024) {
      toast.error("Video size should not exceed 30MB");
      e.target.value = "";
      setPreview("");
      return;
    }

    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
    }
  };

  const removeVideo = () => {
    inputRef.current.file.value = "";
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("name", inputRef.current.name.value);
      formData.append("video", inputRef.current.file.files[0]);
      formData.append("description", inputRef.current.description.value);
      formData.append("category", inputRef.current.category.value);
      formData.append("price", inputRef.current.price.value);

      let res = await axiosInstance.post("/api/food", formData);

      toast.success(res.data.message);
      setIsLoading(false);
      inputRef.current.name.value = "";
      inputRef.current.description.value = "";
      inputRef.current.file.value = "";
      inputRef.current.price.value = "";
      setPreview("");
      navigate("/partner-home/profile");
    } finally {
      setIsLoading(false);
    }
  };

  let handlelogout = async () => {
    let res = await axiosInstance.get("/api/foodPartner/logout");
    toast.success(res.data.message);
    dispatch(removePartner());
  };

  return (
    <div className="min-h-screen bg-[#090B12] p-4 sm:p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto h-[calc(100vh-48px)] grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="bg-[#101522] border border-white/8 rounded-[32px] p-6 flex flex-col shadow-[0_0_22px_rgba(78,161,255,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-4 border-b border-white/8 pb-6">
            <img
              src={partner.profile}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border border-[#4ea1ff]/20"
            />

            <div>
              <h2 className="text-white text-lg font-bold">
                {partner.businessname}
              </h2>
              <p className="text-zinc-400 text-sm">Admin Panel</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => navigate("/partner-home/profile")}
              className="w-full flex items-center gap-3 bg-[#0d1220] hover:bg-[#121a2b] transition text-white rounded-2xl py-3 px-4 border border-white/8"
            >
              <User size={18} />
              Profile
            </button>

            <button
              onClick={handlelogout}
              className="w-full flex items-center gap-3 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition text-red-400 rounded-2xl py-3 px-4"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="mt-auto pt-6">
            <div className="bg-[#0d1220] rounded-2xl p-4 border border-white/8">
              <p className="text-zinc-400 text-sm leading-6">
                Upload attractive food videos to improve customer engagement and showcase your menu visually.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#101522] border border-white/8 rounded-[32px] p-6 sm:p-8 overflow-y-auto shadow-[0_0_22px_rgba(78,161,255,0.08)] backdrop-blur-xl"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white">Create Food</h1>
            <p className="text-zinc-400 mt-2">
              Upload food videos with details and descriptions.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold tracking-widest text-zinc-400 mb-2 uppercase">
              Food Video
            </label>

            <div className="border border-dashed border-white/10 bg-[#0d1220] rounded-2xl overflow-hidden">
              <input
                required={!preview}
                ref={(e) => {
                  inputRef.current.file = e;
                }}
                type="file"
                accept="video/*"
                className="hidden"
                id="videoInput"
                onChange={handleVideoChange}
              />

              {!preview ? (
                <label
                  htmlFor="videoInput"
                  className="h-60 flex flex-col items-center justify-center text-center cursor-pointer"
                >
                  <UploadCloud className="text-[#8dbdff] w-14 h-14 mb-4" />
                  <p className="text-white text-lg font-medium">
                    Tap to upload or drag and drop
                  </p>
                  <p className="text-zinc-500 text-sm mt-2">
                    MP4, WebM, MOV • Up to 30MB
                  </p>
                </label>
              ) : (
                <div className="relative">
                  <video
                    src={preview}
                    controls
                    className="w-full h-[420px] object-cover bg-black"
                  />

                  <div className="absolute top-4 right-4 flex gap-3">
                    <label
                      htmlFor="videoInput"
                      className="bg-[#4ea1ff] hover:bg-[#2f7cff] text-white p-3 rounded-xl cursor-pointer transition shadow-[0_0_18px_rgba(78,161,255,0.18)]"
                    >
                      <RefreshCcw size={20} />
                    </label>

                    <button
                      type="button"
                      onClick={removeVideo}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition shadow-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest text-zinc-400 mb-2 uppercase">
                Name
              </label>

              <input
                ref={(e) => (inputRef.current.name = e)}
                required
                type="text"
                placeholder="e.g., Spicy Paneer Wrap"
                className="w-full bg-[#0d1220] border border-white/8 text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4ea1ff] placeholder:text-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-zinc-400 mb-2 uppercase">
                Category
              </label>

              <input
                ref={(e) => (inputRef.current.category = e)}
                type="text"
                placeholder="e.g., Fast Food"
                className="w-full bg-[#0d1220] border border-white/8 text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4ea1ff] placeholder:text-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest text-zinc-400 mb-2 uppercase">
                Price
              </label>

              <input
                ref={(e) => (inputRef.current.price = e)}
                required
                type="number"
                min="0"
                placeholder="e.g., 199"
                className="w-full bg-[#0d1220] border border-white/8 text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4ea1ff] placeholder:text-zinc-500 no-spinner"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-semibold tracking-widest text-zinc-400 mb-2 uppercase">
              Description
            </label>

            <textarea
              ref={(e) => (inputRef.current.description = e)}
              rows="6"
              placeholder="Write a short description..."
              className="w-full bg-[#0d1220] border border-white/8 text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4ea1ff] placeholder:text-zinc-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition ${
              isLoading
                ? "bg-[#4ea1ff]/70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#4ea1ff] to-[#2f7cff] hover:shadow-[0_0_24px_rgba(78,161,255,0.22)] cursor-pointer"
            }`}
          >
            {isLoading ? "Saving..." : "Save Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;