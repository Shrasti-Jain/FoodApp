import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setPartner } from "../../../reducers/partnerSlice";
import {toast} from 'react-toastify'

const PartnerLogin = () => {
  const navigate = useNavigate();
  const inputRef = useRef({});
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
   try{
     e.preventDefault();

    setIsLoading(true);

    const data = {
      email: inputRef.current.email.value,
      password: inputRef.current.password.value,
    };

    const res = await axiosInstance.post("/api/foodPartner/login", data);
   toast.success(res.data.message)
    dispatch(setPartner(res.data.data));
    
    setIsLoading(false);

    navigate("/partner-home");
   } finally{
    setIsLoading(false)
   }
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-950 via-blue-950 to-black overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col justify-center px-20">

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-5xl shadow-xl shadow-blue-500/20">
            🍽️
          </div>

          <h1 className="mt-10 text-6xl font-bold text-white leading-tight">
            Manage
            <br />
            Your Food
            <br />
            Business
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-xl leading-relaxed">
            Access your dashboard, manage food listings, track orders,
            and grow your customer base from one place.
          </p>

          <div className="mt-12 flex gap-10">

            <div>
              <h3 className="text-4xl font-bold text-white">500+</h3>
              <p className="text-slate-400 mt-1">Partners</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">50K+</h3>
              <p className="text-slate-400 mt-1">Orders</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">10K+</h3>
              <p className="text-slate-400 mt-1">Customers</p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          {/* Header */}
          <div className="text-center">

            <div className="lg:hidden w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-3xl">
              🍽️
            </div>

            <h2 className="text-4xl font-bold text-white">
              Partner Login
            </h2>

            <p className="text-slate-400 mt-3">
              Access your partner dashboard
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Switch to{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                User Account
              </span>
            </p>

          </div>

          {/* Form */}
          <div className="mt-8 space-y-5">

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                Email Address
              </label>

              <input
                ref={(e) => (inputRef.current.email = e)}
                required
                type="email"
                placeholder="business@example.com"
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                Password
              </label>

              <input
                ref={(e) => (inputRef.current.password = e)}
                required
                type="password"
                placeholder="Enter password"
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="flex justify-end">
              <span
                onClick={() => navigate("/partner/forget")}
                className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/20 cursor-pointer"
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-sm mt-8">
            New partner?{" "}
            <span
              onClick={() => navigate("/partner/register")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
            >
              Register here
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default PartnerLogin;