import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../config/axiosInstance";
import {toast} from 'react-toastify'

const PartnerRegister = () => {
  const navigate = useNavigate();
  const inputRef = useRef({});
  let [isLoading,setIsLoading]=useState(false)

  const handleSubmit = async (e) => {
   try{
     e.preventDefault();
     setIsLoading(true)
    const data = {
      businessname: inputRef.current.businessname.value,
      contactname: inputRef.current.contactname.value,
      contact: inputRef.current.contact.value,
      address: inputRef.current.address.value,
      email: inputRef.current.email.value,
      password: inputRef.current.password.value,
    };

    let res=await axiosInstance.post("/api/foodPartner/register", data);
    toast.success(res.data.message)
    setIsLoading(false)
    navigate("/partner/otp", {
      state: {
        email: data.email,
      },
    });
   }finally{
    setIsLoading(false)
   }
  };

  return (
    <div className="min-h-screen bg-black flex">
      
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-black">

        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-4xl mb-8">
            🍽️
          </div>

          <h1 className="text-6xl font-bold text-white leading-tight">
            Grow Your
            <br />
            Food Business
          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-lg">
            Join our platform and connect with thousands of customers looking
            for delicious homemade meals and restaurant-quality food.
          </p>

          <div className="mt-10 flex gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="text-gray-400">Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-gray-400">Partners</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">50K+</h3>
              <p className="text-gray-400">Orders</p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >

          <div className="text-center mb-8">

            <h2 className="text-4xl font-bold text-white">
              Partner Sign Up
            </h2>

            <p className="text-gray-400 mt-3">
              Create your partner account and start selling today.
            </p>

            <p className="text-sm mt-4 text-gray-400">
              Switch to{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                User Account
              </span>
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-xs text-gray-300">
                BUSINESS NAME
              </label>

              <input
                required
                ref={(e) => (inputRef.current.businessname = e)}
                type="text"
                placeholder="Tasty Bites"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300">
                CONTACT NAME
              </label>

              <input
                required
                ref={(e) => (inputRef.current.contactname = e)}
                type="text"
                placeholder="John Doe"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300">
                PHONE NUMBER
              </label>

              <input
                required
                ref={(e) => (inputRef.current.contact = e)}
                type="text"
                maxLength={10}
                minLength={10}
                placeholder="9876543210"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300">
                EMAIL ADDRESS
              </label>

              <input
                required
                ref={(e) => (inputRef.current.email = e)}
                type="email"
                placeholder="business@example.com"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-300">
                PASSWORD
              </label>

              <input
                required
                ref={(e) => (inputRef.current.password = e)}
                type="password"
                placeholder="Create a strong password"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-300">
                BUSINESS ADDRESS
              </label>

              <input
                ref={(e) => (inputRef.current.address = e)}
                type="text"
                placeholder="123 Market Street, City"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white outline-none focus:border-blue-500"
              />

              <p className="text-xs text-gray-500 mt-2">
                Full address helps customers discover your business faster.
              </p>
            </div>

          </div>

        <button
  type="submit"
  disabled={isLoading}
  className={`w-full mt-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 ${
    isLoading
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 cursor-pointer"
  }`}
>
  {isLoading ? "Creating Account..." : "Create Partner Account"}
</button>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already a partner?{" "}
            <span
              onClick={() => navigate("/partner/login")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              Sign In
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;