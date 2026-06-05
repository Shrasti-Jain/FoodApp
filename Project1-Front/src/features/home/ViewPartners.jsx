import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Store,
  Phone,
  Mail,
  MapPin,
  User,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";

const ViewPartners = () => {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let getPartners = async () => {
      let res = await axiosInstance.get("/api/foodPartner/all");
      setPartners(res.data.data);
    };
    getPartners();
  }, []);

  if(partners.length==0){
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
              View <span className="text-[#8dbdff]">Partners</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Browse all food partners in a premium dark interface.
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
              Trusted partner network
            </div>

            <h2 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">
              Meet the
              <span className="block bg-gradient-to-r from-white via-[#dcecff] to-[#74a9ff] bg-clip-text text-transparent">
                Food Partners
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-6">
              Explore business names, contact details, addresses, and profile images of all registered partners.
            </p>
          </div>

          <button
            onClick={() => navigate("/home/collection")}
            className="group w-14 h-14 rounded-2xl border border-[#1f2a3a] bg-[#0f1626] hover:bg-[#111a2c] hover:shadow-[0_0_24px_rgba(78,161,255,0.25)] transition-all duration-300 flex items-center justify-center shrink-0"
          >
            <div className="w-14 h-14 rounded-full bg-[#4ea1ff] shadow-[0_0_28px_rgba(78,161,255,0.7)] flex items-center justify-center group-hover:shadow-[0_0_38px_rgba(78,161,255,0.9)] transition-all duration-300">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#8dbdff]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              All Partners
            </h2>
          </div>

          <span className="px-3 py-1.5 rounded-full border border-[#4ea1ff]/20 bg-[#101522] text-[#8dbdff] text-sm">
            {partners.length} Partners
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
          {partners.map((partner) => (
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
      </div>
    </div>
  );
};

export default ViewPartners;