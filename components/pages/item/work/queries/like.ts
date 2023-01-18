import { http } from "@lib/services/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { LikeMutationVariables } from "@types";

export const useLikeWorkItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, LikeMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/likes`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["market-item", id],
      });
    },
  });
};
