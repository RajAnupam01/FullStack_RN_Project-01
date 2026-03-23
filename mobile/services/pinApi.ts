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

  const uriParts = data.image.uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  formData.append("image", {
    uri: data.image.uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  } as any);

  const res = await axiosInstance.post("/pin/create", formData);
  return res.data;
};