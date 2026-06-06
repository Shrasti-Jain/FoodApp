import React, { useEffect } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import UserLogin from '../features/user/Screens/UserLogin'
import UserRegister from '../features/user/Screens/UserRegister'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { removeError } from '../reducers/ErrorSlice'
import OtpPage from '../features/user/Screens/OtpPage'
import Home from '../features/home/Home'
import PartnerRegister from '../features/partners/screens/PartnerRegister'
import PartnerLogin from '../features/partners/screens/PartnerLogin'
import PartnerOtp from '../features/partners/screens/PartnerOtp'
import PartnerHome from '../features/partners/screens/PartnerHome'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedUserHome from '../layouts/ProtectedUserHome'
import PartnerLayout from '../layouts/PartnerLayout'
import ProtectedPartnerHome from '../layouts/ProtectedPartnerHome'
import { axiosInstance, setupInterceptor } from '../config/axiosInstance'
import { setUser } from '../reducers/userSlice'
import { setPartner } from '../reducers/partnerSlice'
import ProfilePage from '../features/Profile/screens/ProfilePage'
import { currentUser } from '../reducers/authAction'
import { store } from '../app/store'
import { currentPartner } from '../reducers/partnerAction'
import UserProfile from '../features/user/Screens/UserProfile'
import PartnersProfile from '../features/partners/screens/PartnersProfile'
import DetailFood from '../features/partners/screens/DetailFood'
import VideoPage from '../features/Profile/screens/VideoPage'
import Cart from '../features/home/Cart'
import ForgetPassword from '../features/user/Screens/ForgetPassword'
import ResetPage from '../features/user/Screens/ResetPage'
import PartnerForget from '../features/partners/screens/PartnerForget'
import ResetPartner from '../features/partners/screens/ResetPartner'
import PublicRoute from '../layouts/PublicRoute'
import Reel from '../features/home/Reel'
import CollectionPage from '../features/Saved/CollectionPage'
import ViewFoods from '../features/home/ViewFoods'
import ViewPartners from '../features/home/ViewPartners'
import SearchPage from '../features/Search/SearchPage'
import NavPage from '../features/home/NavPage'
import { useState } from 'react'


 let router=createBrowserRouter(
      [
      
        {
          path:'/',
          element:<AuthLayout/>,
          children:[
            {
              index:true,
              element:<PublicRoute/>
            },
            {
               path:'register',
          element:<UserRegister/>
            },
            {
          path:'otp',
          element:<OtpPage/>
        },
        {
          path:'login',
          element:<UserLogin/>
        },
        {
          path:'/forget',
          element:<ForgetPassword/>
        },{
          path:'/reset/:token',
          element:<ResetPage/>
        }
          ]
        },
        {
          path:'/home',
          element:<ProtectedUserHome/>,
          children:[
            {
              element:<NavPage/>,
              children:[
                {
                  index:true,
                  element:<Home/>
                },{
            path:'search',
            element:<SearchPage/>
           },{

           },{
            path:'cart',
            element:<Cart/>
           },{
            path:'collection',
            element:<CollectionPage/>
           }
              ]
            },
            {
            path:'profile/:id',
            element:<ProfilePage/>
           },{
            path:'user/profile',
            element:<UserProfile/>
           },{
            path:'food/detail/:id',
            element:<VideoPage/>
           },{
            path:'reels',
            element:<Reel/>
           },{
            path:'view/foods',
            element:<ViewFoods/>
           },{
            path:'view/partners',
            element:<ViewPartners/>
           },
          ]
        },

        {
          path:'/partner',
          element:<PartnerLayout/>,
          children:[
             {
          path:'register',
          element:<PartnerRegister/>
        },
         {
          path:'login',
          element:<PartnerLogin/>
        }
        ,{
          path:'otp',
          element:<PartnerOtp/>
        },{
          path:'forget',
          element:<PartnerForget/>
        },{
          path:'reset/:token',
          element:<ResetPartner/>
        }
          ]
        }
        ,
         { 
          path:'/partner-home',
          element:<ProtectedPartnerHome/>,
          children:[
             {
          index:true,
          element:<PartnerHome/>
           },
           {
            path:'profile',
            element:<PartnersProfile/>
           },
           {
            path:'detailfood/:id',
            element:<DetailFood/>
           }
          ]  
        },
        
    ])

const AppRoutes = () => {
  let {error}=useSelector((state)=>state.error)
  let dispatch=useDispatch()
  let {user}=useSelector((state)=>state.user)
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
   setupInterceptor(axiosInstance, store)
}, [])

    useEffect(()=>{
        if(error){
        toast.error(error)
        dispatch(removeError())
        }
    },[error])
   
  useEffect(() => {
  const checkAuth = async () => {
    await Promise.allSettled([
      dispatch(currentUser()),
      dispatch(currentPartner())
    ]);

    setAuthChecked(true);
  };

  checkAuth();
}, [dispatch]);
  
if (!authChecked) {
    return (
    <div className="min-h-screen bg-[#090B12] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#2d6bff]/10 blur-[100px] rounded-full" />
      <div className="absolute top-[120px] right-[-100px] w-[300px] h-[300px] bg-[#1f4fff]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] left-[20%] w-[320px] h-[320px] bg-[#0ea5e9]/8 blur-[120px] rounded-full" />

      <div className="relative w-20 h-20 rounded-full border-4 border-white/10 border-t-[#4ea1ff] border-r-[#4ea1ff] animate-spin shadow-[0_0_24px_rgba(78,161,255,0.22)]" />
    </div>
  );
}
  return <RouterProvider router={router}/>
}

export default AppRoutes