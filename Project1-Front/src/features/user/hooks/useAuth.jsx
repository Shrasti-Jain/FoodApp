import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { axiosInstance } from "../../../config/axiosInstance"
import { useDispatch } from "react-redux"
import { setUser } from "../../../reducers/userSlice"

export let useAuth=()=>{
    let useRegister=()=>{
         let navigate=useNavigate()
          let inputRef = useRef({})
        
          let handleGoogle=()=>{
              window.location.href='http://localhost:3000/api/auth/google'
          }
        
          
          return {
             inputRef,navigate,handleGoogle
          }
    }

    let useLogin=()=>{
        let navigate=useNavigate()
  let inputRef=useRef({})
 
  let dispatch=useDispatch()

  let handleGoogle=()=>{
   window.location.href='http://localhost:3000/api/auth/google'
  }
    return {handleGoogle,inputRef,dispatch,navigate}
    }
   
    let useOtp=(email)=>{
      let dispatch=useDispatch()
      
        let [otp, setOtp] = useState(["", "", "", "", "", ""])
      
        let inputRefs = useRef([])
      
        let navigate = useNavigate()
      
      
      
        let handleChange = (e, index) => {
      
          let value = e.target.value
      
          let newOtp = [...otp]
      
          newOtp[index] = value
      
          setOtp(newOtp)
      
          if (value && index < 5) {
            inputRefs.current[index + 1].focus()
          }
      
          if (!value && index > 0) {
            inputRefs.current[index - 1].focus()
          }
        }
        return {otp,navigate,handleChange,inputRefs}
    }

    return {
        useRegister,
        useLogin,
       useOtp
    }
}

