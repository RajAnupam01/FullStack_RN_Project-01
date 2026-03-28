import { getTokens } from "@/utils/storage"
import axiosInstance from "./api"

export const getAllPins = async () => {
  const res = await axiosInstance.get("/pin/all")
  return res.data
}

export const getSinglePin = async (id: string) => {
  const res = await axiosInstance.get(`/pin/single/${id}`)
  return res.data
}

export const createPin = async (data: any) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);

  formData.append("image", {
    uri: data.image.uri,
    name: "photo.jpg",
    type: "image/jpeg",
  } as any);

  const { accessToken } = await getTokens();

  const res = await fetch("http://10.97.3.197:3000/api/pin/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const result = await res.json();
  return result;
};;

export const toggleSaveUnSavePin = async(pinId:string) =>{
  const res = await axiosInstance.post(`/pin/toggleSaveUnSavePin/${pinId}`)
  return res.data
}

export const toggleLikeUnLikePin = async(pinId:string) =>{
  const res = await axiosInstance.post(`/pin/toggleLikeUnLikePin/${pinId}`)
  return res.data
}

export const getToggleSavedUnsavedPin = async() =>{
  const res = await axiosInstance.get("/pin/getSaveUnSavePin")
   return res.data
}

export const getCreatedPin = async() =>{
  const res = await axiosInstance.get("/pin/getCreatedPins")
   return res.data
}