import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPin } from "@/services/pinApi";

export const useCreatePin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPin,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['pins'] });
            queryClient.refetchQueries({ queryKey: ['createdPin'] });
        },
    })
}