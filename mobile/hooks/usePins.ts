import { useQuery } from "@tanstack/react-query";
import { getAllPins } from "@/services/pinApi";

export const usePins = () => {
    return useQuery({
        queryKey: ['pins'],
        queryFn: async () => {
            const res = await getAllPins();
              console.log("DB call occurred: getAllPins");
            return res.data
        },
        staleTime: Infinity,          // never becomes stale
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}