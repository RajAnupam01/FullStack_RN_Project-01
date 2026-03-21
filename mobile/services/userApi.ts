import axiosInstance from "./api"

export const getMyProfile = async() =>{
    const res = await axiosInstance.get("/user/me");
    return res.data.data
}