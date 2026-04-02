import { useQuery } from "@tanstack/react-query";
import { getToggleSavedUnsavedPin } from "@/services/pinApi";

export const useSavedPin = () => {
    return useQuery({
        queryKey: ['savedPin'],
        queryFn: async () => {
            const res = await getToggleSavedUnsavedPin();
             console.log("DB call occurred: getToggleSavedUnsavedPin");
            return res.data
        },
        staleTime: Infinity,          
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}