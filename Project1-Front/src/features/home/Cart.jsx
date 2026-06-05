import React, { useState } from "react";
import {
  Trash2,
  ShoppingBag,
  Minus,
  Plus,
  ShoppingCart
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { setUser } from "../../reducers/userSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  const subtotal =
    user?.cartItems?.reduce(
      (acc, item) => acc + item.food.price * item.quantity,
      0
    ) || 0;

  let handleOrder = async () => {
    try {
      setIsLoading(true);
      let res = await axiosInstance.get("/api/user/order");
      toast.success(res.data.message);
      dispatch(setUser(res.data.data));
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryFee = user?.cartItems?.length > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-[#090B12] text-white relative overflow-hidden pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
        <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative border-b border-white/8 bg-[#0d1220]/95 backdrop-blur-2xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">My Cart</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Review your selected food items
            </p>
          </div>

          <div className="bg-[#101522] border border-[#4ea1ff]/20 px-4 py-2 rounded-xl shadow-[0_0_18px_rgba(78,161,255,0.12)]">
            <span className="text-[#8dbdff] font-semibold">
              {user?.cartItems?.length || 0} Items
            </span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-5">
            {user.cartItems.length != 0 ? (
              user?.cartItems?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/8 bg-[#101522] overflow-hidden hover:border-[#4ea1ff]/40 hover:shadow-[0_0_22px_rgba(78,161,255,0.12)] transition-all duration-300 p-5"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    <div
                      onClick={() => navigate(`/home/food/detail/${item.food._id}`)}
                      className="w-full md:w-44 h-36 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                    >
                      <video
                        src={item.food.video}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {item.food.name}
                        </h2>

                        <p className="text-zinc-400 mt-2 line-clamp-2">
                          {item.food.description}
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                          <img
                            src={
                              item.food.foodPartner.profile ||
                              "https://cdn.vectorstock.com/i/1000v/41/91/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.jpg"
                            }
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />

                          <div>
                            <p className="text-sm text-zinc-400">Partner</p>
                            <p className="font-medium text-white">
                              {item.food.foodPartner.businessname}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-5">
                        <div>
                          <h3 className="text-3xl font-bold text-[#8dbdff]">
                            ₹{item.food.price}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center bg-[#0d1220] border border-white/10 rounded-2xl overflow-hidden">
                            <button
                              onClick={async () => {
                                let res = await axiosInstance.get(
                                  `/api/food/removecart/${item.food._id}`
                                );
                                dispatch(setUser(res.data.data));
                                toast.success(res.data.message);
                              }}
                              className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition"
                            >
                              <Minus size={18} />
                            </button>

                            <div className="w-14 h-12 flex items-center justify-center border-x border-white/10 font-bold text-lg text-white">
                              {item.quantity}
                            </div>

                            <button
                              onClick={async () => {
                                let res = await axiosInstance.get(
                                  `/api/user/addtocart/${item.food._id}`
                                );
                                dispatch(setUser(res.data.data));
                                toast.success(res.data.message);
                              }}
                              className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition"
                            >
                              <Plus size={18} />
                            </button>
                          </div>

                          <div className="bg-[#4ea1ff]/10 border border-[#4ea1ff]/20 px-4 py-3 rounded-2xl">
                            <span className="text-[#8dbdff] font-semibold">
                              ₹{item.food.price * item.quantity}
                            </span>
                          </div>

                          <button
                            onClick={async () => {
                              let res = await axiosInstance.get(
                                `/api/food/remove/${item.food._id}`
                              );
                              dispatch(setUser(res.data.data));
                              toast.success(res.data.message);
                            }}
                            className="bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-400 transition px-5 py-3 rounded-xl flex items-center justify-center gap-2"
                          >
                            <Trash2 size={18} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-[#4ea1ff]/10 border border-[#4ea1ff]/20 flex items-center justify-center shadow-[0_0_40px_rgba(78,161,255,0.25)]">
                  <ShoppingCart className="w-12 h-12 text-[#4ea1ff]" />
                </div>

                <h1 className="mt-6 text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-[#dcecff] to-[#4ea1ff] bg-clip-text text-transparent">
                  No Cart Items
                </h1>

                <p className="mt-3 text-zinc-400 text-center max-w-md">
                  Your cart is empty. Add some delicious food and start your order.
                </p>

                <button
                  onClick={() => navigate("/home")}
                  className="mt-6 px-6 py-3 rounded-2xl border border-[#4ea1ff]/30 bg-[#101522] text-[#8dbdff] hover:border-[#4ea1ff] hover:text-white hover:shadow-[0_0_25px_rgba(78,161,255,0.3)] transition-all duration-300"
                >
                  Explore Foods →
                </button>
              </div>
            )}
          </div>

          <div className="h-fit sticky top-24">
            <div className="rounded-[28px] border border-white/8 bg-[#101522] p-6 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="text-[#8dbdff]" />
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="space-y-3 mb-6">
                {user?.cartItems?.map((item) => (
                  <div
                    key={item.food._id}
                    className="flex justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium text-white">{item.food.name}</p>
                      <p className="text-zinc-400">
                        ₹{item.food.price} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-white">
                      ₹{item.food.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-4 space-y-4">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-zinc-300">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="flex justify-between text-zinc-300">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>

                <div className="border-t border-white/8 pt-4 flex justify-between">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-[#8dbdff]">
                    ₹{total}
                  </span>
                </div>
              </div>

              {user.cartItems.length != 0 ? (
                <button
                  onClick={handleOrder}
                  disabled={isLoading}
                  className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                    isLoading
                      ? "bg-[#4ea1ff]/70 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#4ea1ff] to-[#2f7cff] hover:shadow-[0_0_25px_rgba(78,161,255,0.25)] cursor-pointer"
                  }`}
                >
                  {isLoading ? "Placing Order..." : "Order Now"}
                </button>
              ) : null}

              <button
                onClick={() => navigate("/home")}
                className="w-full mt-3 bg-[#0d1220] hover:bg-[#121a2b] transition-all py-4 rounded-2xl font-semibold border hover:border-[#2552b4] border-white/8 text-[#dcecff]"
              >
                Continue Shopping
              </button>
            </div>

            <div className="mt-5 rounded-[28px] bg-[#101522] border border-[#4ea1ff]/15 p-5 shadow-[0_0_22px_rgba(78,161,255,0.08)]">
              <h3 className="font-bold text-lg text-white">🎉 Special Offer</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Apply coupon and get up to 30% OFF on your first order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;