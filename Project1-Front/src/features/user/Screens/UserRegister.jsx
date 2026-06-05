import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const UserRegister = () => {
  let { useRegister } = useAuth();
  let [loading, setLoading] = useState(false);
  let { navigate, inputRef, handleGoogle } = useRegister();

  let handleSubmit = async (e) => {
   try{
     e.preventDefault();
    setLoading(true);

    let data = {
      firstname: inputRef.current.firstname.value,
      lastname: inputRef.current.lastname.value,
      email: inputRef.current.email.value,
      password: inputRef.current.password.value,
    };

    let res = await axiosInstance.post("/api/auth/register", {
      ...data,
      provider: "local",
    });

    setLoading(false);

    toast.success(res.data.message);

    navigate("/otp", {
      state: {
        email: data.email,
      },
    });
   } finally{
    setLoading(false)
   }
  };

  return (
    <div className="min-h-screen bg-black flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-black">

        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-4xl mb-8">
            🍔
          </div>

          <h1 className="text-6xl font-bold text-white leading-tight">
            Discover
            <br />
            Amazing Food
          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-lg">
            Join thousands of food lovers and explore delicious meals from
            trusted food partners near you.
          </p>

          <div className="mt-12 flex gap-10">

            <div>
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="text-gray-400">Happy Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-gray-400">Food Partners</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">50K+</h3>
              <p className="text-gray-400">Orders Delivered</p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-gray-400 mt-3">
              Join our community and discover amazing meals.
            </p>

            <p className="mt-4 text-sm text-gray-400">
             <span>Switch to </span> 
              <span
                onClick={() => navigate("/partner/register")}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Food Partner
              </span>
            </p>

          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 transition-all duration-300 py-3 rounded-xl font-semibold mb-6"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-[1px] bg-slate-700"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-slate-700"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-gray-400 mb-2">
                  First Name
                </label>

                <input
                  required
                  ref={(e) => (inputRef.current.firstname = e)}
                  type="text"
                  placeholder="Jane"
                  className="
w-full
bg-slate-800/80
border
border-slate-700
rounded-xl
px-4
py-3
outline-none
text-white
placeholder:text-gray-500
focus:border-blue-500
focus:ring-2
focus:ring-blue-500/20
transition-all
"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-gray-400 mb-2">
                  Last Name
                </label>

                <input
                  required
                  ref={(e) => (inputRef.current.lastname = e)}
                  type="text"
                  placeholder="Doe"
                 className="
w-full
bg-slate-800/80
border
border-slate-700
rounded-xl
px-4
py-3
outline-none
text-white
placeholder:text-gray-500
focus:border-blue-500
focus:ring-2
focus:ring-blue-500/20
transition-all
"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-gray-400 mb-2">
                Email Address
              </label>

              <input
                required
                ref={(e) => (inputRef.current.email = e)}
                type="email"
                placeholder="you@example.com"
               className="
w-full
bg-slate-800/80
border
border-slate-700
rounded-xl
px-4
py-3
outline-none
text-white
placeholder:text-gray-500
focus:border-blue-500
focus:ring-2
focus:ring-blue-500/20
transition-all
"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-gray-400 mb-2">
                Password
              </label>

              <input
                required
                ref={(e) => (inputRef.current.password = e)}
                type="password"
                placeholder="••••••••"
                className="
w-full
bg-slate-800/80
border
border-slate-700
rounded-xl
px-4
py-3
outline-none
text-white
placeholder:text-gray-500
focus:border-blue-500
focus:ring-2
focus:ring-blue-500/20
transition-all
"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer shadow-lg shadow-blue-500/20"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer font-medium hover:underline"
            >
              Sign In
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default UserRegister;