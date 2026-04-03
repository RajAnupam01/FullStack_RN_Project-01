import { createComment, fetchCommment } from "@/services/commentApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useComment = (pinId: string) => {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['comments', pinId],
        queryFn: async () => {
            const res = await fetchCommment(pinId)
            console.log("db call for comment to get")
            return res.data
        }
    })
    const mutation = useMutation({
        mutationFn: (content: string) =>
            createComment(content, pinId),
        
        onSuccess: () => {
            queryClient.invalidateQueries({

                queryKey: ['comments', pinId]
            })
        }
    })
    return {
        comments: query.data || [],
        isLoading: query.isLoading,
        addComment: mutation.mutate,
        isAdding: mutation.isPending
    }
}