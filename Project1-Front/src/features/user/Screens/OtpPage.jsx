import { useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../../../config/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import { setUser } from "../../../reducers/userSlice";
import { useDispatch } from "react-redux";

const OtpPage = () => {
  let { useOtp } = useAuth();
  const location = useLocation();
  let [isLoading, setIsLoading] = useState(false);
  let [isResend, setIsResend] = useState(false);
  let dispatch = useDispatch();

  const email = location.state?.email;
  let { otp, navigate, handleChange, inputRefs } = useOtp(email);

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      let finalOtp = otp.join("");

      let res = await axiosInstance.post("/api/auth/otp", {
        otp: finalOtp,
        email,
      });

      dispatch(setUser(res.data.data));
      toast.success(res.data.message);
      setIsLoading(false);
      navigate("/home");
    } finally {
      setIsLoading(false);
    }
  };

  let handleResend = async () => {
    try {
      setIsResend(true);
      let res = await axiosInstance.post("/api/auth/resendOtp", {
        email,
      });
      toast.success(res.data.message);
      setIsResend(false);
    } finally {
      setIsResend(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090B12] px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md bg-[#101522] border border-white/8 rounded-[32px] p-8 shadow-[0_0_24px_rgba(78,161,255,0.08)] backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#4ea1ff]/10 border border-[#4ea1ff]/20 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(78,161,255,0.16)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-[#8dbdff]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.98l-7.5 4.214A2.25 2.25 0 0112 16.1a2.25 2.25 0 01-2.134 0l-7.5-4.214A2.25 2.25 0 012.25 9.906V9m19.5 0A2.25 2.25 0 0019.5 6.75h-15A2.25 2.25 0 002.25 9m19.5 0v5.344A2.25 2.25 0 0119.5 16.5h-15a2.25 2.25 0 01-2.25-2.156V9"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white">Verify OTP</h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Enter the 6-digit OTP sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex items-center justify-between gap-3">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                className="w-14 h-14 rounded-2xl bg-[#0d1220] border border-white/8 text-white text-center text-xl outline-none focus:border-[#4ea1ff] transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-2xl font-semibold text-lg text-white transition-all duration-300 ${
              isLoading
                ? "bg-[#4ea1ff]/70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#4ea1ff] to-[#2f7cff] hover:shadow-[0_0_24px_rgba(78,161,255,0.22)] cursor-pointer"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">Didn&apos;t receive OTP?</p>

          <button
            onClick={handleResend}
            disabled={isResend}
            className={`mt-2 text-sm font-medium transition-all ${
              isResend
                ? "text-[#8dbdff] cursor-not-allowed"
                : "text-[#4ea1ff] hover:text-[#8dbdff] cursor-pointer"
            }`}
          >
            {isResend ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;