import { getTokens } from "@/utils/storage";
import axiosInstance from "./api"
import { BASE_URL } from "./api";

export const getMyProfile = async () => {
    const res = await axiosInstance.get("/user/me");
    return res.data.data
}

export const ChangeMyProfile = async (data: any) => {
    const formData = new FormData()

    if (data.name) formData.append("name", data.name)
    if (data.email) formData.append("email", data.email);
    if (data.avatar) {
        formData.append("avatar", {
            uri: data.avatar.uri,
            name: "photo.jpg",
            type: "image/jpeg",
        } as any);
    }
    const { accessToken } = await getTokens();

    const res = await fetch(`${BASE_URL}/user/update-me`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });

    const result = await res.json();
    return result;

}