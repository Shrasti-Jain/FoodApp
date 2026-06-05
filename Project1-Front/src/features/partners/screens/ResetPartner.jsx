import React, { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const ResetPartner = () => {
  let [isLoading, setIsLoading] = useState(false);
  let ref = useRef({});

  let { token } = useParams();

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      let data = {
        password: ref.current.password.value,
        confirmPassword: ref.current.confirmPassword.value,
      };

      if (data.password !== data.confirmPassword)
        return toast.error("Password mismatched!!!");

      let res = await axiosInstance.post(
        `/api/foodPartner/resetPartner/${token}`,
        data
      );
      ref.current.confirmPassword.value = "";
      ref.current.password.value = "";
      toast.success(res.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#101522] border border-white/8 rounded-[32px] p-8 shadow-[0_0_24px_rgba(78,161,255,0.08)] backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#4ea1ff]/10 border border-[#4ea1ff]/20 flex items-center justify-center shadow-[0_0_18px_rgba(78,161,255,0.16)]">
              <Lock size={36} className="text-[#8dbdff]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center">
            Reset Password
          </h1>

          <p className="text-zinc-400 text-center mt-3 mb-8">
            Create a strong password to secure your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-zinc-300 text-sm mb-2">
                New Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  ref={(e) => (ref.current.password = e)}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full bg-[#0d1220] border border-white/8 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-[#4ea1ff] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 text-sm mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  ref={(e) => (ref.current.confirmPassword = e)}
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full bg-[#0d1220] border border-white/8 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-[#4ea1ff] transition"
                />
              </div>
            </div>

            <div className="bg-[#0d1220] border border-white/8 rounded-2xl p-4">
              <p className="text-sm text-zinc-400 mb-2">
                Password requirements:
              </p>

              <ul className="space-y-1 text-xs text-zinc-500">
                <li>• Minimum 8 characters</li>
                <li>• At least one uppercase letter</li>
                <li>• At least one number</li>
                <li>• At least one special character</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-semibold py-3 rounded-2xl transition duration-300 ${
                isLoading
                  ? "bg-[#4ea1ff]/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#4ea1ff] to-[#2f7cff] hover:shadow-[0_0_24px_rgba(78,161,255,0.22)] cursor-pointer"
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPartner;