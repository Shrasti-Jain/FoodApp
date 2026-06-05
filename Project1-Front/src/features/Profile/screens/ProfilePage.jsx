import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";

const ProfilePage = () => {
  let [profile, setProfile] = useState({});
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    let call = async () => {
      let res = await axiosInstance.get(`/api/foodPartner/foodpartner/${id}`);
      setProfile(res.data.data);
    };
    call();
  }, [id]);

  if (!profile || Object.keys(profile).length === 0)
     return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
      <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      <div className="relative w-20 h-20 rounded-full border-4 border-white/10 border-t-[#4ea1ff] border-r-[#4ea1ff] animate-spin shadow-[0_0_24px_rgba(78,161,255,0.22)]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-md bg-[#1a1a1a] min-h-screen">
        <div className="p-4 border-b border-gray-700 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
          >
            <ChevronLeft className="text-white" size={22} />
          </button>
          <h1 className="text-white text-lg font-semibold">Profile</h1>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 overflow-hidden rounded-full bg-gray-700">
              <img
                className="h-full w-full object-cover"
                src={
                  profile.profile ||
                  "https://img.magnific.com/vecteurs-premium/illustration-plate-vectorielle-profile-utilisateur-avatar-image-profil-personne-icone-convient-pour-profils-medias-sociaux-icones-economiseurs-ecran-comme-modele_719432-2477.jpg?semt=ais_hybrid&w=740&q=80"
                }
                alt=""
              />
            </div>

            <div className="flex-1">
              <h2 className="text-white font-semibold text-lg">
                {profile?.businessname}
              </h2>
              <p className="text-gray-400 text-sm">{profile?.address}</p>
            </div>
          </div>

          <div className="flex justify-around mt-6 text-center">
            <div>
              <p className="text-white font-semibold text-lg">43</p>
              <p className="text-gray-400 text-sm">Meals</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">15K</p>
              <p className="text-gray-400 text-sm">Customers</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">
                {profile?.food?.length || 0}
              </p>
              <p className="text-gray-400 text-sm">Posts</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700"></div>

        <div className="grid grid-cols-3 gap-[2px] bg-black">
          {profile.food
            ? profile.food.map((e, i) => (
                <div
                  onClick={() => navigate(`/home/food/detail/${e._id}`)}
                  key={i}
                  className="aspect-[9/16] overflow-hidden bg-black cursor-pointer"
                >
                  <video
                    src={e.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;