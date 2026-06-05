import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../../../config/axiosInstance";
import { setUser } from "../../../reducers/userSlice";
import { toast } from "react-toastify";

const UserLogin = () => {
  const { useLogin } = useAuth();
  const { handleGoogle, inputRef, dispatch, navigate } = useLogin();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  try{
      e.preventDefault();

    setIsLoading(true);

    const data = {
      email: inputRef.current.email.value,
      password: inputRef.current.password.value,
    };

    const res = await axiosInstance.post("/api/auth/login", data);

    setIsLoading(false);

    toast.success(res.data.message);

    dispatch(setUser(res.data.data));

    navigate("/home");
  }finally{
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
            🍔
          </div>

          <h1 className="mt-10 text-6xl font-bold text-white leading-tight">
            Welcome
            <br />
            Back
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-xl leading-relaxed">
            Login and continue exploring delicious meals from your favourite
            food partners.
          </p>

          <div className="mt-12 flex gap-10">
            
            <div>
              <h3 className="text-4xl font-bold text-white">10K+</h3>
              <p className="text-slate-400 mt-1">Users</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">500+</h3>
              <p className="text-slate-400 mt-1">Partners</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">50K+</h3>
              <p className="text-slate-400 mt-1">Orders</p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

          {/* Mobile Logo */}
          <div className="lg:hidden w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-3xl">
            🍔
          </div>

          {/* Header */}
          <div className="text-center">
            
            <h1 className="text-4xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-slate-400 mt-3">
              Login to continue your food journey.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Switch to{" "}
              <span
                onClick={() => navigate("/partner/register")}
                className="text-blue-400 font-medium cursor-pointer hover:text-blue-300"
              >
                Food Partner
              </span>
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email Address
              </label>

              <input
                required
                ref={(e) => (inputRef.current.email = e)}
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <input
                required
                ref={(e) => (inputRef.current.password = e)}
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => navigate("/forget")}
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                Forgot Password?
              </button>
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
              {isLoading ? "Logging..." : "Login"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-slate-700"></div>

            <p className="text-slate-400 text-sm">OR</p>

            <div className="flex-1 h-[1px] bg-slate-700"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 transition-all duration-300 text-black py-3 rounded-xl font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-6 h-6"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.239 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.176 35.091 26.715 36 24 36c-5.219 0-9.623-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 01-4.084 5.571h.001l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>

            Continue with Google
          </button>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?
            <button
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-300 ml-1 font-medium cursor-pointer"
            >
              Register
            </button>
          </p>

        </div>

      </div>

    </div>
  );
};

export default UserLogin;