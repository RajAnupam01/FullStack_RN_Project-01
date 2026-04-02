import { useQuery } from "@tanstack/react-query";
import { getSinglePin } from "@/services/pinApi";

export const useSinglePin = (id: string) => {
    return useQuery({
        queryKey: ['pin', id],
        queryFn: async () => {
            const res = await getSinglePin(id);
            console.log("DB call: getSinglePin");
            return res.data
        },
        
    })
}