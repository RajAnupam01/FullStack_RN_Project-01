import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePin } from "@/services/pinApi";

export const useDeletePin = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: removePin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pins"] });
            queryClient.invalidateQueries({ queryKey: ["createdPin"] });
            queryClient.invalidateQueries({queryKey:['savedPin']})
        }
    })
}