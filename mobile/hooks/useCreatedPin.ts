import { useQuery } from "@tanstack/react-query";
import { getCreatedPin } from "@/services/pinApi";

export const useCreatedPin = () => {
    return useQuery({
        queryKey: ['createdPin'],
        queryFn: async () => {
            const res = await getCreatedPin();
             console.log("DB call occurred: getCreatedPin");
            return res.data
        },
        staleTime: Infinity,          // never becomes stale
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}