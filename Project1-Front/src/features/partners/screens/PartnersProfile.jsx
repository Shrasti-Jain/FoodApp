import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Store,
  Calendar,
  ShieldCheck,
  Pencil,
  Trash2,
  Play,
  Camera,
  Save,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../config/axiosInstance";
import { setPartner } from "../../../reducers/partnerSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PartnersProfile = () => {
  const fileRef = useRef();

  let [isLoading, setIsLoading] = useState(false);
  let [uploading, setUploading] = useState(false);

  const [editMode, setEditMode] = useState(false);

  let { partner } = useSelector((state) => state.partner);

  let [isdelete, setIsDelete] = useState(false);

  let [food, setFood] = useState([]);

  useEffect(() => {
    let getFoods = async () => {
      let res = await axiosInstance.get(`/api/foodPartner/food-partner/${partner._id}`);
      setFood(res.data.data.food);
      setIsDelete(false);
    };
    getFoods();
  }, [isdelete]);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleImage = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];

      let formData = new FormData();
      formData.append("profile", file);

      let res = await axiosInstance.post("/api/foodPartner/update-photo", formData);
      dispatch(setPartner(res.data.data));
      toast.success(res.data.message);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let res = await axiosInstance.post("/api/foodPartner/update-profile", {
        contactname: partner.contactname,
        address: partner.address,
        contact: partner.contact,
      });
      dispatch(setPartner(res.data.data));
      setEditMode(false);
      toast.success(res.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090B12] p-4 md:p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="bg-[#101522] border border-white/8 rounded-[32px] p-6 md:p-10 shadow-[0_0_22px_rgba(78,161,255,0.08)] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative w-fit">
                <img
                  src={partner.profile}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#4ea1ff]/20 shadow-[0_0_24px_rgba(78,161,255,0.14)]"
                />
                {uploading && (
                  <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      Uploading...
                    </span>
                  </div>
                )}

                {editMode && (
                  <>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImage}
                    />

                    {!uploading ? (
                      <button
                        onClick={() => fileRef.current.click()}
                        className="absolute bottom-2 right-2 bg-[#4ea1ff] hover:bg-[#2f7cff] text-white p-3 rounded-2xl shadow-[0_0_18px_rgba(78,161,255,0.18)] transition"
                      >
                        <Camera size={20} />
                      </button>
                    ) : null}
                  </>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h1 className="text-3xl font-black text-white">
                    {partner.businessname}
                  </h1>

                  <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                    Active
                  </span>
                </div>

                <p className="text-zinc-400 flex items-center gap-2 mb-2">
                  <Store size={18} />
                  Food Partner Account
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#4ea1ff] hover:bg-[#2f7cff] transition text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-[0_0_18px_rgba(78,161,255,0.18)]"
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition ${
                      isLoading
                        ? "bg-[#4ea1ff]/70 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 cursor-pointer"
                    }`}
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition text-red-400 px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 mt-8">
          <div className="space-y-6">
            <div className="bg-[#101522] border border-white/8 rounded-[32px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <h2 className="text-white text-2xl font-bold mb-6">
                Partner Information
              </h2>

              <div className="space-y-5">
                <div className="bg-[#0d1220] rounded-2xl p-4 border border-white/8">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="text-[#8dbdff]" size={18} />
                    <p className="text-zinc-400 text-sm">Contact Name</p>
                  </div>

                  {editMode ? (
                    <input
                      type="text"
                      value={partner.contactname}
                      onChange={(e) => (partner.contactname = e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#4ea1ff]/20 text-white px-4 py-3 rounded-xl outline-none focus:border-[#4ea1ff]"
                    />
                  ) : (
                    <h3 className="text-white font-semibold">
                      {partner.contactname}
                    </h3>
                  )}
                </div>

                <div className="bg-[#0d1220] rounded-2xl p-4 border border-white/8">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="text-[#8dbdff]" size={18} />
                    <p className="text-zinc-400 text-sm">Email</p>
                  </div>

                  <h3 className="text-white font-semibold break-all">
                    {partner.email}
                  </h3>
                </div>

                <div className="bg-[#0d1220] rounded-2xl p-4 border border-white/8">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="text-[#8dbdff]" size={18} />
                    <p className="text-zinc-400 text-sm">Phone</p>
                  </div>

                  {editMode ? (
                    <input
                      type="text"
                      value={partner.contact}
                      onChange={(e) => (partner.contact = e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#4ea1ff]/20 text-white px-4 py-3 rounded-xl outline-none focus:border-[#4ea1ff]"
                    />
                  ) : (
                    <h3 className="text-white font-semibold">
                      {partner.contact}
                    </h3>
                  )}
                </div>

                <div className="bg-[#0d1220] rounded-2xl p-4 border border-white/8">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="text-[#8dbdff]" size={18} />
                    <p className="text-zinc-400 text-sm">Address</p>
                  </div>

                  {editMode ? (
                    <textarea
                      rows="3"
                      value={partner.address}
                      onChange={(e) => (partner.address = e.target.value)}
                      className="w-full bg-[#0b1120] border border-[#4ea1ff]/20 text-white px-4 py-3 rounded-xl outline-none resize-none focus:border-[#4ea1ff]"
                    />
                  ) : (
                    <h3 className="text-white font-semibold">
                      {partner.address}
                    </h3>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#101522] border border-white/8 rounded-[32px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-[#8dbdff]" />
                <h2 className="text-white text-xl font-bold">Joined</h2>
              </div>

              <p className="text-zinc-300 text-lg">
                {partner.createdAt.slice(0, 10)}
              </p>
            </div>

            <div className="bg-[#101522] border border-white/8 rounded-[32px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-green-400" />
                <h2 className="text-white text-xl font-bold">Verification</h2>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                <p className="text-green-400 font-medium">Verified Partner</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101522] border border-white/8 rounded-[32px] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Uploaded Reels
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Manage all uploaded reels
                </p>
              </div>

              <button
                onClick={() => navigate("/partner-home")}
                className="bg-[#4ea1ff] hover:bg-[#2f7cff] transition text-white px-5 py-3 rounded-2xl font-semibold shadow-[0_0_18px_rgba(78,161,255,0.18)]"
              >
                Upload Reel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {food.map((reel) => (
                <div
                  key={reel._id}
                  className="bg-[#0d1220] border border-white/8 rounded-[28px] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300"
                >
                  <div className="relative">
                    <video
                      src={reel.video}
                      className="w-full h-72 object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                      <button
                        onClick={() =>
                          navigate(`/partner-home/detailfood/${reel._id}`)
                        }
                        className="bg-white/20 backdrop-blur-md p-4 rounded-full"
                      >
                        <Play className="text-white fill-white" size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-4">
                      {reel.name}
                    </h3>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/partner-home/detailfood/${reel._id}`)
                        }
                        className="flex-1 bg-[#4ea1ff] hover:bg-[#2f7cff] transition text-white py-2.5 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          let res = await axiosInstance.get(
                            `/api/food/deletefood/${reel._id}`
                          );
                          setIsDelete(true);
                          toast.success(res.data.message);
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-2.5 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersProfile;