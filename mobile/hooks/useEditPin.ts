import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPin } from "@/services/pinApi";

export const useEditPin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return editPin(id, data);
    },

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["pins"] });
      queryClient.refetchQueries({ queryKey: ["createdPin"] });
    },
  });
};