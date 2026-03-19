import { removeTokens, storeToken } from "@/utils/storage"
import axiosInstance from "./api"

export const RegisterUser = async(data:any)=>{
  const res = await axiosInstance.post("/auth/register",data)
  await storeToken(res.data.data.accessToken,res.data.data.refreshToken);
  return res.data
}

export const LoginUser = async(data:any)=>{
    const res = await axiosInstance.post("/auth/login",data)
    await storeToken(res.data.data.accessToken, res.data.data.refreshToken);
    return res.data
}
export const LogoutUser = async(data:any)=>{
  try {
    await axiosInstance.post("/auth/logout")
  } catch (error) {
    console.log(error)
  }
  await removeTokens()
}