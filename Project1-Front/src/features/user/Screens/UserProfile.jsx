import React, { useState } from "react";
import {
  Camera,
  Pencil,
  Save,
  Mail,
  User,
  Calendar,
  ArrowLeft,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../config/axiosInstance";
import { setUser } from "../../../reducers/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UserProfile = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [uploading, setUploading] = useState(false);

  let { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    provider: user?.provider || "",
    joined: user?.createdAt || "",
    profile:
      user?.profile ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s",
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setData({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      provider: user?.provider || "",
      joined: user?.createdAt || "",
      profile:
        user?.profile ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s",
    });
  }, [user]);

  let dispatch = useDispatch();
  let inputRef = useRef();

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let res = await axiosInstance.post("/api/user/update-profile", {
        firstname: data.firstname,
        lastname: data.lastname,
      });
      toast.success(res.data.message);
      dispatch(setUser(res.data.data));
      setEdit(false);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  let handleProfilePhoto = async (e) => {
    try {
      setUploading(true);
      let file = e.target.files[0];

      let formData = new FormData();
      formData.append("profile", file);

      let res = await axiosInstance.post("/api/user/update-photo", formData);
      dispatch(setUser(res.data.data));
      setUploading(false);
      toast.success(res.data.message);
    } finally {
      setUploading(false);
    }
  };

  let ref = useRef({});
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#090B12] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-[#101522] border border-[#4ea1ff]/20 flex items-center justify-center hover:bg-[#121a2b] hover:border-[#4ea1ff]/40 transition shadow-[0_0_18px_rgba(78,161,255,0.12)]"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="relative w-full min-h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-white/8 flex flex-col items-center justify-center px-8 py-14 bg-[#0d1220]/60 backdrop-blur-xl">
          <div className="relative">
            <img
              src={data.profile}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#4ea1ff]/20 shadow-[0_0_30px_rgba(78,161,255,0.15)]"
            />
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  Uploading...
                </span>
              </div>
            )}
            {edit && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {!uploading ? (
                  <button
                    onClick={() => {
                      ref.current.click();
                    }}
                    className="w-12 h-12 rounded-full bg-[#4ea1ff] text-white flex items-center justify-center hover:scale-105 transition shadow-[0_0_20px_rgba(78,161,255,0.35)]"
                  >
                    <Camera size={18} />
                  </button>
                ) : null}
              </div>
            )}
          </div>
          <input
            onChange={handleProfilePhoto}
            ref={ref}
            type="file"
            accept="image/*"
            hidden
          />

          <h1 className="text-3xl font-semibold mt-10 text-white">
            {data.firstname + data.lastname}
          </h1>

          <p className="text-zinc-400 mt-2">{data.email}</p>

          <div className="mt-6 px-5 py-2 rounded-full border border-[#4ea1ff]/20 bg-[#101522] text-sm text-[#8dbdff]">
            {user.provider == "local" ? "Local Account" : "Google Account"}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-[65%] px-6 sm:px-10 lg:px-16 py-10 flex flex-col justify-center"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Profile Settings
              </h2>
              <p className="text-zinc-400 mt-2">
                Manage your account details
              </p>
            </div>

            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="flex items-center justify-center gap-2 bg-[#4ea1ff] text-white px-5 py-3 rounded-2xl font-medium hover:scale-[1.02] transition shadow-[0_0_18px_rgba(78,161,255,0.2)]"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setEdit(false)}
                  className="flex items-center justify-center gap-2 bg-[#101522] border border-white/10 px-5 py-3 rounded-2xl font-medium hover:bg-[#121a2b] transition"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-medium transition ${
                    isLoading
                      ? "bg-[#4ea1ff]/70 text-white cursor-not-allowed"
                      : "bg-[#4ea1ff] text-white hover:scale-[1.02] cursor-pointer"
                  }`}
                >
                  <Save size={18} />
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                <User size={16} />
                First Name
              </label>

              <input
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
                required
                value={data.firstname}
                type="text"
                disabled={!edit}
                className={`w-full rounded-2xl px-5 py-4 outline-none border transition ${
                  edit
                    ? "bg-[#101522] border-[#4ea1ff]/20 text-white focus:border-[#4ea1ff]"
                    : "bg-[#101522]/70 border-white/5 text-zinc-500 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                <User size={16} />
                Last Name
              </label>

              <input
                onChange={(e) =>
                  setData({ ...data, lastname: e.target.value })
                }
                required
                value={data.lastname}
                type="text"
                disabled={!edit}
                className={`w-full rounded-2xl px-5 py-4 outline-none border transition ${
                  edit
                    ? "bg-[#101522] border-[#4ea1ff]/20 text-white focus:border-[#4ea1ff]"
                    : "bg-[#101522]/70 border-white/5 text-zinc-500 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                <Mail size={16} />
                Email Address
              </label>

              <input
                value={data.email}
                type="email"
                disabled
                className="w-full rounded-2xl px-5 py-4 bg-[#101522]/70 border border-white/5 text-zinc-500 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-3 block">
                Login Provider
              </label>

              <div className="w-full rounded-2xl px-5 py-4 bg-[#101522] border border-[#4ea1ff]/15 text-white">
                {data.provider == "local" ? "Local" : "Google"}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                <Calendar size={16} />
                Joined On
              </label>

              <div className="w-full rounded-2xl px-5 py-4 bg-[#101522] border border-[#4ea1ff]/15 text-white">
                {data.joined.slice(0, 10)}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;