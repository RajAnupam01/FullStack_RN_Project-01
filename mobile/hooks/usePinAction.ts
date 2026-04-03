import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toggleLikeUnLikePin, toggleSaveUnSavePin, toggleFollow } from "@/services/pinApi";

export const usePinAction = (id: string) => {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: ['pin', id] });
        queryClient.invalidateQueries({ queryKey: ['savedPin'] })
    };

    const likeMutation = useMutation({
        mutationFn: () => toggleLikeUnLikePin(id),
        onSuccess: invalidateAll,
    });

    const followMutation = useMutation({
        mutationFn: (targetId: string) => toggleFollow(targetId),
        onSuccess: invalidateAll
    });

    const saveMutation = useMutation({
        mutationFn: () => toggleSaveUnSavePin(id),
        onSuccess: invalidateAll
    });

    return {
        likeMutation,
        followMutation,
        saveMutation
    }
}
