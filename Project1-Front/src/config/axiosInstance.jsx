import axios from 'axios'
import { setError } from '../reducers/ErrorSlice'
const url=import.meta.env.VITE_BACKEND_URL;

export let axiosInstance=axios.create({
    baseURL:url,
    withCredentials:true
})

export const setupInterceptor = (axiosInstance, store) => {

  axiosInstance.interceptors.response.use(

    (res) => {
      return res
    },

    async (error) => {
     
    let originalReq=error.config;
     
    if (
  error.response?.status === 401 &&
  !originalReq.retry &&
  (originalReq.url != "/api/auth/get-accessToken" || originalReq.url==='/api/foodPartner/get-accessPartnerToken')
) {
  originalReq.retry = true;

  try {
    await axiosInstance.get("/api/auth/get-accessToken", {
      skipDispatch: true,
    });

    return axiosInstance(originalReq);
  } catch (userError) {
    try {
      await axiosInstance.get(
        "/api/foodPartner/get-accessPartnerToken",
        {
          skipDispatch: true,
        }
      );
      return Promise.reject(userError);

    } catch (partnerError) {
      return Promise.reject(partnerError);
    }
  }
}



    if (!error.config?.skipDispatch) {
      store.dispatch(
        setError(
          error.response?.data?.message || error.message
        )
      );
    }

      return Promise.reject(error)
    }
  )
}