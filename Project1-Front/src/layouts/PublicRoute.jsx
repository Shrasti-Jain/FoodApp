import React from "react";
import { useNavigate } from "react-router";

const PublicRoute = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🎥",
      title: "Watch Food Videos",
      desc: "Explore delicious meals through engaging short food videos.",
    },
    {
      icon: "⚡",
      title: "Instant Ordering",
      desc: "Order your favorite dishes quickly and easily.",
    },
    {
      icon: "🍔",
      title: "Fresh & Delicious",
      desc: "Discover meals prepared by trusted food partners.",
    },
  ];

  const partnerBenefits = [
    "Upload food videos",
    "Manage orders",
    "Reach more customers",
    "Grow your business",
  ];

  const userBenefits = [
    "Discover new meals",
    "Easy ordering",
    "Track orders",
    "Smooth experience",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          🍔 <span className="text-blue-500">FoodHub</span>
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white hover:text-black transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
              Food Discovery Platform
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover
              <span className="block text-blue-500">
                Amazing Food
              </span>
              Near You
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
              Watch food videos, discover local dishes, connect with trusted
              food partners, and order your favorite meals effortlessly.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >
                Start Ordering
              </button>

              <button
                onClick={() => navigate("/partner/register")}
                className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition font-semibold"
              >
                Become Partner
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
              alt="food"
              className="w-full max-w-xl rounded-[2rem] shadow-2xl object-cover"
            />

            <div className="absolute -bottom-6 -left-4 bg-[#111] border border-white/10 rounded-2xl p-4">
              <h3 className="font-bold text-2xl">10K+</h3>
              <p className="text-gray-400 text-sm">
                Happy Customers
              </p>
            </div>

            <div className="absolute -top-6 -right-4 bg-[#111] border border-white/10 rounded-2xl p-4">
              <h3 className="font-bold text-2xl">500+</h3>
              <p className="text-gray-400 text-sm">
                Food Partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <h2 className="text-5xl font-bold text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="mt-6 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* For Users */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
              alt=""
              className="rounded-3xl w-full h-[500px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              Made For Food Lovers
            </h2>

            <p className="mt-5 text-gray-400 text-lg">
              Explore food visually, discover new restaurants,
              and enjoy a smooth ordering experience.
            </p>

            <div className="mt-10 space-y-4">
              {userBenefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    ✓
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Partners */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-5xl font-bold">
              Grow Your Food Business
            </h2>

            <p className="mt-5 text-gray-400 text-lg">
              Showcase your food, attract customers, manage
              orders, and increase your reach.
            </p>

            <div className="mt-10 space-y-4">
              {partnerBenefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    ✓
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
              alt=""
              className="rounded-3xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["10K+", "Users"],
            ["500+", "Partners"],
            ["50K+", "Orders"],
            ["4.9★", "Rating"],
          ].map(([number, text]) => (
            <div
              key={text}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
            >
              <h3 className="text-5xl font-bold text-blue-500">
                {number}
              </h3>

              <p className="text-gray-400 mt-3">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <h2 className="text-5xl font-bold text-center">
          What People Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-300 text-lg">
              “The best food discovery app I've used.
              Watching food videos before ordering is amazing.”
            </p>

            <h4 className="mt-6 font-semibold">
              — Food Lover
            </h4>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-300 text-lg">
              “Our orders increased significantly after
              joining the platform.”
            </p>

            <h4 className="mt-6 font-semibold">
              — Food Partner
            </h4>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2rem] p-12 text-center">
          <h2 className="text-5xl font-bold">
            Ready To Join?
          </h2>

          <p className="mt-4 text-lg text-white/80">
            Start exploring amazing food or grow your food business today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-2xl bg-white text-black font-semibold"
            >
              Join as User
            </button>

            <button
              onClick={() => navigate("/partner/register")}
              className="px-8 py-4 rounded-2xl border border-white bg-transparent hover:bg-white hover:text-black transition font-semibold"
            >
              Become Partner
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500">
        © 2026 FoodHub • All Rights Reserved
      </footer>
    </div>
  );
};

export default PublicRoute;