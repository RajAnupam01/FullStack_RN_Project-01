import axiosInstance from "./api"

export const createComment = async(data:string,id:string)=>{
    const res = await axiosInstance.post(`/comment/addComment/${id}`,{content:data})
    return res.data
}

export const fetchCommment = async(id:string) =>{
    const res = await axiosInstance.get(`/comment/getComment/${id}`)
    return res.data
}

export const deleteComment = async(id:string) =>{
    const res = await axiosInstance.delete(`/comment/removeComment/${id}`)
    return res.data
}