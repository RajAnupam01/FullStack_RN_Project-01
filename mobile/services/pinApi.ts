import axiosInstance from "./api"

export const getAllPins = async() =>{
    const res = await axiosInstance.get("/pin/all")
    return res.data
}

export const getSinglePin = async()=>{
    const res = await axiosInstance.get("/pin/single/:id")
    return res.data
}

export const createPin = async(data:any)=>{
    const res = await axiosInstance.post("/pin/create",data)
    return res.data
}