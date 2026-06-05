import React, { useRef, useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let inputRef = useRef({});

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let res = await axiosInstance.post("/api/auth/forget", {
        email: inputRef.current.email.value,
      });
      setIsLoading(false);
      inputRef.current.email.value = "";
      toast.success(res.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="bg-[#101522] border border-white/8 rounded-[32px] p-8 shadow-[0_0_24px_rgba(78,161,255,0.08)] backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#4ea1ff]/10 border border-[#4ea1ff]/20 flex items-center justify-center shadow-[0_0_18px_rgba(78,161,255,0.16)]">
              <Mail className="text-[#8dbdff]" size={36} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center">
            Forgot Password?
          </h1>

          <p className="text-zinc-400 text-center mt-3 mb-8">
            Enter your email address and we'll send you a mail to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-zinc-300 mb-2 text-sm">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  ref={(e) => (inputRef.current.email = e)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#0d1220] border border-white/8 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-[#4ea1ff] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-3 rounded-2xl transition duration-300 text-white ${
                isLoading
                  ? "bg-[#4ea1ff]/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#4ea1ff] to-[#2f7cff] hover:shadow-[0_0_24px_rgba(78,161,255,0.22)] cursor-pointer"
              }`}
            >
              {isLoading ? "Sending..." : "Forget Password"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              Remember your password?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#4ea1ff] cursor-pointer hover:text-[#8dbdff]"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;